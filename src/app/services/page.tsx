"use client"

import Link from "next/link"
import { Check } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Section } from "@/components/section"

const packages = [
  {
    name: "Basic",
    price: "₱6,599",
    description: "Perfect for small businesses needing a professional online presence.",
    features: [
      "One-Page Website / Landing Page",
      "Mobile Responsive Design",
      "Basic SEO Optimization",
      "Social Media Integration",
      "Contact Form",
      "1 Month Support",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "₱9,599",
    description: "Ideal for growing businesses that need more pages and features.",
    features: [
      "Up to 5 Pages",
      "CMS (Content Management System)",
      "Advanced SEO Setup",
      "Google Maps Integration",
      "Blog / News Section",
      "3 Months Support",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "₱15,599",
    description: "Full-featured online store to sell your products worldwide.",
    features: [
      "Unlimited Products",
      "Shopping Cart & Checkout",
      "Payment Gateway Integration",
      "Inventory Management",
      "Customer Accounts",
      "6 Months Support",
    ],
    popular: false,
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 py-20 text-center">
        <div className="container px-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Our Services & Pricing</h1>
            <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
                Transparent pricing packages tailored to your business needs. No hidden fees.
            </p>
        </div>
      </div>

      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className={`h-full flex flex-col relative ${pkg.popular ? 'border-primary shadow-lg ring-1 ring-primary' : ''}`}>
                {pkg.popular && (
                    <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        Most Popular
                    </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">{pkg.price}</span>
                    {pkg.name === "E-Commerce" && <span className="text-muted-foreground text-sm ml-1">starts at</span>}
                  </div>
                  <CardDescription className="mt-2">{pkg.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3 text-sm">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-4 w-4 text-primary mr-2 mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant={pkg.popular ? "default" : "outline"}>
                    <Link href="/contact">Request Quote</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
         <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold">Need a Custom Solution?</h2>
            <p className="text-primary-foreground/80 max-w-[600px] mx-auto">
                We understand that every business is unique. Contact us for a custom quote tailored to your specific requirements.
            </p>
            <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Contact Us</Link>
            </Button>
         </div>
      </Section>
    </div>
  )
}
