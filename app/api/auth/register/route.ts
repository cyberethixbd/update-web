import { NextResponse } from "next/server"
import { dataStore } from "@/lib/simple-store"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: "Invalid email format" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = dataStore.findUserByEmail(email.toLowerCase().trim())

    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 409 })
    }

    // Create user
    const newUser = dataStore.createUser({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: "user",
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: newUser.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  }
}
