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
