"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Section } from "@/components/section"
import { PortfolioCard } from "@/components/portfolio-card"
import { projects } from "@/data/projects"

const categories = ["restaurant"]

export default function PortfolioPage() {
  const [filter, setFilter] = React.useState("restaurant")

  const filteredProjects = React.useMemo(() => {
    if (filter === "all") return projects
    return projects.filter((project) => project.category === filter)
  }, [filter])

  return (
    <div className="min-h-screen">
      <div className="bg-muted/30 py-20 text-center">
        <div className="container px-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Our Portfolio</h1>
          <p className="text-lg text-muted-foreground max-w-[700px] mx-auto">
            Explore our latest work and see how we help businesses grow online.
          </p>
        </div>
      </div>

      <Section>
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                <PortfolioCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
                No projects found in this category.
            </div>
        )}
      </Section>
    </div>
  )
}
