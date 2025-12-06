import { z } from "zod"

// Lead / Contact form validation
export const leadSchema = z.object({
  business_name: z
    .string()
    .min(1, "Business name is required")
    .max(200, "Business name too long"),
  industry: z
    .string()
    .min(1, "Industry is required")
    .max(100, "Industry too long"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .max(20, "Phone number too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  message: z
    .string()
    .min(1, "Message is required")
    .max(2000, "Message too long"),
})

export type LeadInput = z.infer<typeof leadSchema>

// Portfolio item validation
export const portfolioSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title too long"),
  industry: z
    .string()
    .min(1, "Industry is required")
    .max(100, "Industry too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2000, "Description too long"),
  image_url: z
    .string()
    .url("Invalid image URL")
    .nullable()
    .optional(),
  live_url: z
    .string()
    .url("Invalid live URL")
    .nullable()
    .optional(),
})

export type PortfolioInput = z.infer<typeof portfolioSchema>

// Portfolio update validation (all fields optional)
export const portfolioUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  industry: z.string().min(1).max(100).optional(),
  description: z.string().min(1).max(2000).optional(),
  image_url: z.string().url().nullable().optional(),
  live_url: z.string().url().nullable().optional(),
})

export type PortfolioUpdateInput = z.infer<typeof portfolioUpdateSchema>
