import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, currency = "usd", metadata } = await request.json()

    // Mock payment intent for demo purposes
    const mockPaymentIntent = {
      client_secret: `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      id: `pi_mock_${Date.now()}`,
      amount: Math.round(amount * 100),
      currency,
      status: "requires_payment_method",
    }

    return NextResponse.json({
      clientSecret: mockPaymentIntent.client_secret,
    })
  } catch (error) {
    console.error("Payment intent creation failed:", error)
    return NextResponse.json({ error: "Payment intent creation failed" }, { status: 500 })
  }
}
