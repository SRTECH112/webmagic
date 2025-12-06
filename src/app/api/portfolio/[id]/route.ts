import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { portfolioUpdateSchema } from "@/lib/validations"

interface RouteParams {
  params: Promise<{ id: string }>
}

// GET /api/portfolio/[id] - Get single portfolio item
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params

    const { data, error } = await supabase
      .from("portfolio")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Portfolio item not found" },
          { status: 404 }
        )
      }
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to fetch portfolio item" },
        { status: 500 }
      )
    }

    return NextResponse.json({ item: data })
  } catch (err) {
    console.error("Fetch portfolio item error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// PUT /api/portfolio/[id] - Update portfolio item (admin only)
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    // In production, add authentication check here
    const { id } = await params
    const body = await request.json()
    const validation = portfolioUpdateSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const updateData = validation.data

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("portfolio")
      .update(updateData)
      .eq("id", id)
      .select()
      .single()

    if (error) {
      if (error.code === "PGRST116") {
        return NextResponse.json(
          { error: "Portfolio item not found" },
          { status: 404 }
        )
      }
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to update portfolio item" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, item: data })
  } catch (err) {
    console.error("Update portfolio error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/portfolio/[id] - Delete portfolio item (admin only)
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    // In production, add authentication check here
    const { id } = await params

    const { error } = await supabase
      .from("portfolio")
      .delete()
      .eq("id", id)

    if (error) {
      console.error("Supabase error:", error)
      return NextResponse.json(
        { error: "Failed to delete portfolio item" },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: "Portfolio item deleted" })
  } catch (err) {
    console.error("Delete portfolio error:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
