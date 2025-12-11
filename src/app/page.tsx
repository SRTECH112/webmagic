"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle, Code, Smartphone, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { Project } from "@/types"
import { PortfolioCard } from "@/components/portfolio-card"

export default function Home() {
  const featuredProjects: Project[] = [
    {
      id: "laundry-shop-name",
      title: "Laundry Shop ",
      category: "local business",
      description: "Premium laundry booking website with instant pricing, same-day pickup, and digital receipts.",
      image: "https://i.imgur.com/kldzRc1.png",
      tags: ["Next.js", "Tailwind CSS", "Supabase"],
      link: "https://laundry-two-zeta.vercel.app/"
    },
    {
      id: "savore",
      title: "Savore",
      category: "restaurant",
      description: "Modern restaurant website with beautiful menu showcase and online reservations.",
      image: "https://i.imgur.com/M9BOeRv.png",
      tags: ["Next.js", "Tailwind CSS"],
      link: "https://savore-xi.vercel.app/"
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 md:py-32 overflow-hidden text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background blur-3xl" />
        
        <div className="container px-4 md:px-6 space-y-8">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
           >
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                We Build <span className="text-transparent bg-clip-text bg-linear-to-r from-black to-purple-600 dark:from-white dark:to-secondary">Digital Magic</span> for Your Business
              </h1>
           </motion.div>
           
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
           >
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                Premium websites for restaurants, cafes, and local businesses in the Philippines. 
                Fast, responsive, and designed to convert.
              </p>
           </motion.div>

           <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-4 sm:flex-row justify-center"
           >
              <Button asChild size="lg" className="text-lg h-12 px-8">
                <Link href="#featured">
                  View Projects <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg h-12 px-8">
                <Link href="/contact">Get Started</Link>
              </Button>
           </motion.div>
        </div>
      </section>

      {/* Value Propositions */}
      <Section className="bg-muted/30">
        <div className="grid gap-8 md:grid-cols-3">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card shadow-sm"
          >
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <Smartphone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Mobile First Design</h3>
            <p className="text-muted-foreground">
              Your website will look stunning on every device, from smartphones to desktops.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card shadow-sm"
          >
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Blazing Fast Speed</h3>
            <p className="text-muted-foreground">
              Optimized for performance and SEO to help you rank higher on Google.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center text-center space-y-4 p-6 rounded-lg bg-card shadow-sm"
          >
            <div className="p-4 rounded-full bg-primary/10 text-primary">
              <Code className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Modern Tech Stack</h3>
            <p className="text-muted-foreground">
              Built with the latest technologies like Next.js, React, and Tailwind CSS.
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Portfolio Preview */}
      <Section id="featured">
        <div className="flex flex-col space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Featured Works</h2>
            <p className="text-muted-foreground max-w-[600px] mx-auto">
              Check out some of our recent projects for local businesses.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, index) => (
               <motion.div
                 key={project.id}
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: index * 0.1 }}
                 className="h-full"
               >
                 <PortfolioCard project={project} />
               </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Banner */}
      <Section className="bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl font-bold tracking-tighter">Ready to Transform Your Business?</h2>
            <p className="text-primary-foreground/80 max-w-[600px]">
              Let's build a website that drives more customers to your door. Get a free quote today.
            </p>
          </div>
          <Button asChild size="lg" variant="secondary" className="min-w-[200px] h-14 text-lg shadow-xl">
            <Link href="/contact">Request a Quote</Link>
          </Button>
        </div>
      </Section>
    </div>
  )
}
