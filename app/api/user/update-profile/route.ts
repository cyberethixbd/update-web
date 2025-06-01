import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { dataStore } from "@/lib/simple-store"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 })
    }

    // Check if email is already taken by another user
    const existingUser = dataStore.findUserByEmail(email)
    if (existingUser && existingUser.id !== session.user.id) {
      return NextResponse.json({ message: "Email is already taken" }, { status: 409 })
    }

    // Update user profile
    const updatedUser = dataStore.updateUser(session.user.id, {
      name,
      email,
    })

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Profile updated successfully" })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
