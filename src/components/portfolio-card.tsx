import { ExternalLink } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Project } from "@/types"

interface PortfolioCardProps {
  project: Project
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/20 group h-full flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {/* Placeholder for image */}
        <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-muted to-accent text-muted-foreground">
            {project.image ? (
                 // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={project.title} className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105" />
            ) : (
                <span className="text-lg font-medium">{project.title}</span>
            )}
        </div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
             <CardTitle className="line-clamp-1">{project.title}</CardTitle>
             <Badge variant="secondary" className="capitalize">{project.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="outline">
          <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">
            Visit Website <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}
