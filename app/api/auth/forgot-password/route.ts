import { NextResponse } from "next/server"
import { dataStore } from "@/lib/simple-store"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ message: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Check if user exists (but don't reveal if they do or don't)
    const user = dataStore.findUserByEmail(email.toLowerCase().trim())

    // Always return the same message for security
    return NextResponse.json(
      { message: "If an account with that email exists, we've sent a password reset link." },
      { status: 200 },
    )
  } catch (error) {
    console.error("Forgot password error:", error)
    return NextResponse.json({ message: "An error occurred" }, { status: 500 })
  }
}
