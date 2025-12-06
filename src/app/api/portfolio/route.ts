import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { portfolioSchema } from "@/lib/validations"

// GET /api/portfolio - Get all portfolio items
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to fetch portfolio items" },
        { status: 500 }
      )
    }

    return NextResponse.json({ items: data })
  } catch (err) {
    console.error("Fetch portfolio error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// POST /api/portfolio - Create new portfolio item (admin only)
export async function POST(request: Request) {
  try {
    // In production, add authentication check here
    const body = await request.json()
    const validation = portfolioSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const portfolioData = validation.data

    const { data, error } = await supabase
      .from("portfolio")
      .insert([portfolioData])
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to create portfolio item" },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, item: data },
      { status: 201 }
    )
  } catch (err) {
    console.error("Create portfolio error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
