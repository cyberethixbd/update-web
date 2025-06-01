import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { dataStore } from "@/lib/simple-store"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status, notes } = await request.json()

    if (!["verified", "rejected"].includes(status)) {
      return NextResponse.json({ message: "Invalid status" }, { status: 400 })
    }

    const payment = dataStore.findPaymentById(params.id)
    if (!payment) {
      return NextResponse.json({ message: "Payment not found" }, { status: 404 })
    }

    const updatedPayment = dataStore.updatePayment(params.id, {
      status,
      verifiedAt: new Date().toISOString(),
      verifiedBy: session.user.id,
      adminNotes: notes || undefined,
    })

    if (!updatedPayment) {
      return NextResponse.json({ message: "Failed to update payment" }, { status: 500 })
    }

    dataStore.createPaymentLog({
      paymentId: params.id,
      action: status,
      userId: session.user.id,
      timestamp: new Date().toISOString(),
      details: { notes },
    })

    return NextResponse.json({ message: `Payment ${status} successfully` })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
