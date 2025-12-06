"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { CheckCircle, Loader2, ArrowRight, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Section } from "@/components/section"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

type FormData = {
  name: string
  email: string
  phone: string
  service: string
  budget: string
  description: string
}

const steps = [
  { id: 1, title: "Contact Info" },
  { id: 2, title: "Project Details" },
  { id: 3, title: "Review" },
]

export default function ContactPage() {
  const [step, setStep] = React.useState(1)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSuccess, setIsSuccess] = React.useState(false)

  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Form submitted:", data)
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const nextStep = async () => {
    let isValid = false
    if (step === 1) {
      isValid = await trigger(["name", "email", "phone"])
    } else if (step === 2) {
      isValid = await trigger(["service", "budget", "description"])
    }
    
    if (isValid) {
      setStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center p-6">
          <div className="flex justify-center mb-4">
             <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl mb-2">Message Sent!</CardTitle>
          <CardDescription>
            Thank you for reaching out. We'll get back to you within 24 hours.
          </CardDescription>
          <div className="mt-6">
            <Button onClick={() => window.location.href = "/"} className="w-full">
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Get a Quote</h1>
          <p className="text-muted-foreground">
            Tell us about your project and we'll help you build it.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative flex justify-between mb-8">
            <div className="absolute top-1/2 left-0 h-1 bg-muted w-full -z-10 -translate-y-1/2" />
            <div 
                className="absolute top-1/2 left-0 h-1 bg-primary -z-10 -translate-y-1/2 transition-all duration-300" 
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((s) => (
                <div key={s.id} className="flex flex-col items-center bg-background px-2">
                    <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 text-sm font-bold transition-colors ${
                            s.id <= step 
                            ? "border-primary bg-primary text-primary-foreground" 
                            : "border-muted text-muted-foreground"
                        }`}
                    >
                        {s.id}
                    </div>
                    <span className="text-xs mt-2 text-muted-foreground hidden sm:block">{s.title}</span>
                </div>
            ))}
        </div>

        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="pt-6">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input 
                                        id="name" 
                                        {...register("name", { required: "Name is required" })} 
                                        placeholder="John Doe" 
                                    />
                                    {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input 
                                        id="email" 
                                        type="email" 
                                        {...register("email", { 
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })} 
                                        placeholder="john@example.com" 
                                    />
                                    {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input 
                                        id="phone" 
                                        type="tel" 
                                        {...register("phone", { required: "Phone is required" })} 
                                        placeholder="+63 912 345 6789" 
                                    />
                                    {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="service">Service Type</Label>
                                    <select 
                                        id="service" 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        {...register("service", { required: "Please select a service" })}
                                    >
                                        <option value="">Select a service...</option>
                                        <option value="web-development">Web Development</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                    {errors.service && <p className="text-sm text-destructive">{errors.service.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="budget">Budget Range</Label>
                                     <select 
                                        id="budget" 
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        {...register("budget", { required: "Please select a budget" })}
                                    >
                                        <option value="">Select a budget...</option>
                                        <option value="6599">₱6,599</option>
                                        <option value="9599">₱9,599</option>
                                        <option value="15599">₱15,599</option>
                                    </select>
                                    {errors.budget && <p className="text-sm text-destructive">{errors.budget.message}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Project Details</Label>
                                    <Textarea 
                                        id="description" 
                                        {...register("description", { required: "Please describe your project" })} 
                                        placeholder="Tell us about your goals, target audience, and any specific features you need." 
                                        rows={5}
                                    />
                                    {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <div className="bg-muted p-4 rounded-lg space-y-2">
                                    <h3 className="font-semibold mb-2">Summary</h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                        <span className="text-muted-foreground">Name:</span>
                                        <span>{getValues("name")}</span>
                                        <span className="text-muted-foreground">Email:</span>
                                        <span>{getValues("email")}</span>
                                        <span className="text-muted-foreground">Service:</span>
                                        <span className="capitalize">{getValues("service")}</span>
                                        <span className="text-muted-foreground">Budget:</span>
                                        <span>{getValues("budget")}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground text-center">
                                    By submitting this form, you agree to our privacy policy and terms of service.
                                </p>
                            </div>
                        )}
                    </motion.div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {step > 1 ? (
                        <Button type="button" variant="outline" onClick={prevStep} disabled={isSubmitting}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    ) : (
                        <div></div>
                    )}
                    
                    {step < 3 ? (
                        <Button type="button" onClick={nextStep}>
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit Request
                        </Button>
                    )}
                </CardFooter>
            </form>
        </Card>
      </div>
    </div>
  )
}
