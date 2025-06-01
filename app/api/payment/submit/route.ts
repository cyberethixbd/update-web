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

    const { method, mobileNumber, transactionId, amount, orderId } = await request.json()

    // Validate required fields
    if (!method || !mobileNumber || !transactionId || !amount) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Validate mobile number format (Bangladeshi)
    const mobileRegex = /^01[3-9]\d{8}$/
    if (!mobileRegex.test(mobileNumber)) {
      return NextResponse.json({ message: "Invalid mobile number format" }, { status: 400 })
    }

    // Validate payment method
    const validMethods = ["bkash", "nagad", "rocket"]
    if (!validMethods.includes(method)) {
      return NextResponse.json({ message: "Invalid payment method" }, { status: 400 })
    }

    // Validate transaction ID length
    if (transactionId.length < 8) {
      return NextResponse.json({ message: "Transaction ID must be at least 8 characters" }, { status: 400 })
    }

    // Check if transaction ID already exists
    const existingPayment = dataStore.findPaymentByTransactionId(transactionId)
    if (existingPayment) {
      return NextResponse.json({ message: "This transaction ID has already been used" }, { status: 409 })
    }

    // Store payment information
    const newPayment = dataStore.createPayment({
      userId: session.user.id,
      userEmail: session.user.email || "",
      method,
      mobileNumber,
      transactionId,
      amount: Number(amount),
      orderId: orderId || null,
      status: "pending",
      verifiedAt: null,
      verifiedBy: null,
    })

    // Log the payment submission
    dataStore.createPaymentLog({
      paymentId: newPayment.id,
      action: "submitted",
      userId: session.user.id,
      timestamp: new Date().toISOString(),
      details: {
        method,
        amount: Number(amount),
        mobileNumber: mobileNumber.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2"),
      },
    })

    return NextResponse.json(
      {
        message: "Payment information submitted successfully",
        paymentId: newPayment.id,
        status: "pending",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Payment submission error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
