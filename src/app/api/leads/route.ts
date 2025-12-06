import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { leadSchema } from "@/lib/validations"
import { sendLeadNotification } from "@/lib/email"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

// POST /api/leads - Submit a new lead
export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request)
    const rateLimit = checkRateLimit(`leads:${clientIp}`, {
      windowMs: 60 * 1000, // 1 minute
      maxRequests: 5, // 5 submissions per minute
    })

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { 
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(rateLimit.resetIn / 1000)),
          },
        }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validation = leadSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const leadData = validation.data

    // Insert into Supabase
    const { data, error } = await supabase
      .from("leads")
      .insert([leadData])
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to save lead" },
        { status: 500 }
      )
    }

    // Send email notification (non-blocking)
    sendLeadNotification(leadData).catch((err) => {
      console.error("Email notification failed:", err)
    })

    return NextResponse.json(
      { success: true, message: "Lead submitted successfully", id: data.id },
      { status: 201 }
    )
  } catch (err) {
    console.error("Lead submission error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET /api/leads - Get all leads (admin only)
export async function GET(request: Request) {
  try {
    // In production, add authentication check here
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to fetch leads" },
        { status: 500 }
      )
    }

    return NextResponse.json({ leads: data })
  } catch (err) {
    console.error("Fetch leads error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
