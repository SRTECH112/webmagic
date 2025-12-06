import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Section } from "@/components/section"
import { projects } from "@/data/projects"

interface ProjectPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params
  const project = projects.find((p) => p.id === id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header / Breadcrumb */}
      <div className="bg-muted/30 py-8">
        <div className="container px-4">
          <Button variant="ghost" asChild className="mb-4 pl-0 hover:bg-transparent hover:text-primary">
            <Link href="/portfolio">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mt-4">
             <Badge variant="secondary" className="text-sm capitalize">{project.category}</Badge>
             {project.tags.map(tag => (
                 <Badge key={tag} variant="outline" className="text-sm">{tag}</Badge>
             ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                {/* Main Banner Image */}
                <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted shadow-lg">
                     <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-accent">
                        {/* Placeholder for main image */}
                         {project.image ? (
                             // eslint-disable-next-line @next/next/no-img-element
                             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                         ) : (
                             <span className="text-muted-foreground">Project Banner</span>
                         )}
                     </div>
                </div>

                {/* Project Description */}
                <div className="prose dark:prose-invert max-w-none">
                    <h3 className="text-2xl font-semibold mb-4">About the Project</h3>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {project.description}
                    </p>
                    <p className="text-muted-foreground mt-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>

                {/* Screenshots Grid */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-semibold">Screenshots</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center text-muted-foreground border shadow-sm">
                                Screenshot {i}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* Project Details Sidebar */}
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm space-y-6">
                    <h3 className="font-semibold text-xl border-b pb-2">Project Details</h3>
                    
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Client</p>
                        <p>{project.title}</p>
                    </div>

                     <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Industry</p>
                        <p className="capitalize">{project.category}</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Services</p>
                        <p>Web Design, Development, SEO</p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-medium text-muted-foreground">Year</p>
                        <p>2024</p>
                    </div>

                    <div className="pt-4">
                         <Button asChild className="w-full" size="lg">
                            <Link href={project.link || "#"} target="_blank">
                                Visit Live Site <ExternalLink className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>

                 {/* CTA Box */}
                 <div className="p-6 rounded-lg bg-primary text-primary-foreground shadow-lg">
                    <h3 className="font-bold text-lg mb-2">Want a website like this?</h3>
                    <p className="text-sm opacity-90 mb-4">
                        Let's discuss how we can help your business grow online.
                    </p>
                    <Button asChild variant="secondary" className="w-full">
                        <Link href="/contact">Get a Quote</Link>
                    </Button>
                 </div>
            </div>
        </div>
      </Section>

      {/* Big Footer CTA */}
      <div className="py-20 bg-muted/50 text-center">
          <div className="container px-4">
             <h2 className="text-3xl font-bold mb-6">Ready to start your project?</h2>
             <Button asChild size="lg" className="h-14 px-8 text-lg">
                <Link href="/contact">Contact Us Today</Link>
             </Button>
          </div>
      </div>
    </div>
  )
}
