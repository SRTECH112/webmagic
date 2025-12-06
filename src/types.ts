export interface Project {
  id: string
  title: string
  category: "restaurant" | "cafe" | "barbershop" | "local business" | "other"
  description: string
  image: string
  tags: string[]
  link?: string
}
