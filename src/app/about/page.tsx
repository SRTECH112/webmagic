"use client"

import Link from "next/link"
import { Award, ShieldCheck, Users, Rocket, Heart, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
       <div className="bg-muted/30 py-20 text-center">
        <div className="container px-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">About WebMagic PH</h1>
            <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
                We are a team of passionate developers and designers dedicated to helping Filipino businesses succeed online.
            </p>
        </div>
      </div>

      <Section>
          <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                  <h2 className="text-3xl font-bold">Who We Are</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                      WebMagic PH is a young web development team building modern, fast, and affordable websites for local Philippine businesses. We’re not here to impress you with fake numbers or corporate jargon — we’re here to deliver clean, functional sites that work, load fast, and help small brands look professional online.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                      We’re currently growing our portfolio and working with our first batch of clients, offering real value at startup-friendly prices. Our focus is simple: websites that are easy to use, mobile-ready, and built with tools trusted by today’s top developers.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                     Whether you're running a café, barbershop, laundry shop, restaurant, or small startup, we’ll help you start strong online and stand out from competitors without spending huge agency money.
                  </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                  <div className="p-6 border rounded-lg bg-card shadow-sm text-center space-y-2">
                      <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                          <Users className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-xl">Fast Delivery</h3>
                      <p className="text-muted-foreground text-sm">Standard website ready in 7–14 days</p>
                  </div>
                  <div className="p-6 border rounded-lg bg-card shadow-sm text-center space-y-2">
                       <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                          <Award className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-xl">Modern Stack</h3>
                      <p className="text-muted-foreground text-sm">Built with Next.js, Tailwind, and AI automation</p>
                  </div>
                  <div className="p-6 border rounded-lg bg-card shadow-sm text-center space-y-2 sm:col-span-2">
                       <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                          <ShieldCheck className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-xl">Affordable Pricing</h3>
                      <p className="text-muted-foreground text-sm">Ideal for startups and local small businesses</p>
                  </div>
              </div>
          </div>
      </Section>

      <Section className="bg-muted/30">
          <div className="text-center max-w-[800px] mx-auto space-y-12">
              <h2 className="text-3xl font-bold">Why Your Business Needs a Website</h2>
              
              <div className="grid gap-8 md:grid-cols-3 text-left">
                  <div className="space-y-2">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mb-4">
                          <Rocket className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg">Credibility</h3>
                      <p className="text-sm text-muted-foreground">
                          84% of consumers believe a business with a website is more credible than one with only a social media page.
                      </p>
                  </div>
                  <div className="space-y-2">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mb-4">
                          <Target className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg">Reach More Customers</h3>
                      <p className="text-sm text-muted-foreground">
                          A website is accessible 24/7, allowing potential customers to find you anytime, anywhere.
                      </p>
                  </div>
                  <div className="space-y-2">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-lg flex items-center justify-center mb-4">
                          <Heart className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-lg">Brand Control</h3>
                      <p className="text-sm text-muted-foreground">
                          Unlike social media, you own your website. Control your narrative and design without algorithm changes.
                      </p>
                  </div>
              </div>
          </div>
      </Section>

      <Section>
          <div className="text-center space-y-6">
              <h2 className="text-3xl font-bold">Let's Build Something Great Together</h2>
              <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
                  Ready to take your business to the next level? Contact us today for a free consultation.
              </p>
              <Button asChild size="lg" className="px-8">
                  <Link href="/contact">Get In Touch</Link>
              </Button>
          </div>
      </Section>
    </div>
  )
}
