import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const adminEmail = process.env.ADMIN_EMAIL

if (!resendApiKey) {
  console.warn("Missing RESEND_API_KEY - emails will not be sent")
}

const resend = resendApiKey ? new Resend(resendApiKey) : null

interface LeadEmailData {
  business_name: string
  industry: string
  phone: string
  email: string
  message: string
}

export async function sendLeadNotification(lead: LeadEmailData): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.warn("Resend not configured - skipping email")
    return { success: false, error: "Email service not configured" }
  }

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL not set - skipping email")
    return { success: false, error: "Admin email not configured" }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "WebMagic PH <onboarding@resend.dev>", // Use your verified domain in production
      to: adminEmail,
      subject: `New Lead: ${lead.business_name}`,
      html: `
        <h2>New Lead Received</h2>
        <p><strong>Business Name:</strong> ${lead.business_name}</p>
        <p><strong>Industry:</strong> ${lead.industry}</p>
        <p><strong>Phone:</strong> ${lead.phone}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Message:</strong></p>
        <p>${lead.message}</p>
        <hr />
        <p><em>This lead was submitted via the WebMagic PH website.</em></p>
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error("Email send error:", err)
    return { success: false, error: "Failed to send email" }
  }
}
