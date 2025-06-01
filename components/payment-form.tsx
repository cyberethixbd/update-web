"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, CheckCircle, Smartphone, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PaymentData {
  method: "bkash" | "nagad" | "rocket" | ""
  mobileNumber: string
  transactionId: string
}

interface PaymentFormProps {
  amount: number
  orderId?: string
  onSuccess?: () => void
}

export default function PaymentForm({ amount, orderId, onSuccess }: PaymentFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [paymentData, setPaymentData] = useState<PaymentData>({
    method: "",
    mobileNumber: "",
    transactionId: "",
  })

  const paymentMethods = [
    {
      id: "bkash",
      name: "bKash",
      color: "bg-pink-500",
      textColor: "text-white",
      icon: "📱",
    },
    {
      id: "nagad",
      name: "Nagad",
      color: "bg-orange-500",
      textColor: "text-white",
      icon: "💳",
    },
    {
      id: "rocket",
      name: "Rocket",
      color: "bg-purple-500",
      textColor: "text-white",
      icon: "🚀",
    },
  ]

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!paymentData.method) {
      newErrors.method = "Please select a payment method"
    }

    if (!paymentData.mobileNumber) {
      newErrors.mobileNumber = "Mobile number is required"
    } else if (!/^01[3-9]\d{8}$/.test(paymentData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid Bangladeshi mobile number (01XXXXXXXXX)"
    }

    if (!paymentData.transactionId) {
      newErrors.transactionId = "Transaction ID is required"
    } else if (paymentData.transactionId.length < 8) {
      newErrors.transactionId = "Transaction ID must be at least 8 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/payment/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...paymentData,
          amount,
          orderId,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || "Payment submission failed")
      }

      setIsSuccess(true)
      toast({
        title: "Payment Information Submitted",
        description: "Your payment information has been received. We will verify and process it shortly.",
      })

      if (onSuccess) {
        onSuccess()
      }
    } catch (error: any) {
      toast({
        title: "Submission Failed",
        description: error.message || "Failed to submit payment information. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof PaymentData, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }))

    // Clear errors when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  if (isSuccess) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Payment Information Submitted!</h3>
          <p className="text-muted-foreground mb-4">
            We have received your payment information. Our team will verify the transaction and update your order status
            within 24 hours.
          </p>
          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm">
              <strong>Payment Method:</strong> {paymentMethods.find((m) => m.id === paymentData.method)?.name}
            </p>
            <p className="text-sm">
              <strong>Mobile Number:</strong> {paymentData.mobileNumber}
            </p>
            <p className="text-sm">
              <strong>Transaction ID:</strong> {paymentData.transactionId}
            </p>
            <p className="text-sm">
              <strong>Amount:</strong> ৳{amount}
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Mobile Payment Information
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Complete your payment using bKash, Nagad, or Rocket and provide the transaction details below.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Amount Display */}
          <div className="bg-primary/10 p-4 rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Total Amount</p>
            <p className="text-2xl font-bold">৳{amount}</p>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3">
            <Label>Select Payment Method</Label>
            <RadioGroup
              value={paymentData.method}
              onValueChange={(value) => handleInputChange("method", value)}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {paymentMethods.map((method) => (
                <div key={method.id} className="relative">
                  <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                  <Label
                    htmlFor={method.id}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 ${
                      paymentData.method === method.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full ${method.color} ${method.textColor} flex items-center justify-center text-xl mb-2`}
                    >
                      {method.icon}
                    </div>
                    <span className="font-medium">{method.name}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.method && <p className="text-sm text-destructive">{errors.method}</p>}
          </div>

          {/* Payment Instructions */}
          {paymentData.method && (
            <Alert>
              <Smartphone className="h-4 w-4" />
              <AlertDescription>
                <strong>Payment Instructions:</strong>
                <br />
                1. Open your {paymentMethods.find((m) => m.id === paymentData.method)?.name} app
                <br />
                2. Send ৳{amount} to our merchant number
                <br />
                3. Copy the transaction ID from the confirmation message
                <br />
                4. Fill in the details below
              </AlertDescription>
            </Alert>
          )}

          {/* Mobile Number Input */}
          <div className="space-y-2">
            <Label htmlFor="mobileNumber">
              Mobile Number <span className="text-destructive">*</span>
            </Label>
            <Input
              id="mobileNumber"
              type="tel"
              placeholder="01XXXXXXXXX"
              value={paymentData.mobileNumber}
              onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
              className={errors.mobileNumber ? "border-destructive" : ""}
            />
            {errors.mobileNumber && <p className="text-sm text-destructive">{errors.mobileNumber}</p>}
            <p className="text-xs text-muted-foreground">Enter the mobile number you used for the payment</p>
          </div>

          {/* Transaction ID Input */}
          <div className="space-y-2">
            <Label htmlFor="transactionId">
              Transaction ID (TXN ID) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="transactionId"
              type="text"
              placeholder="Enter transaction ID"
              value={paymentData.transactionId}
              onChange={(e) => handleInputChange("transactionId", e.target.value)}
              className={errors.transactionId ? "border-destructive" : ""}
            />
            {errors.transactionId && <p className="text-sm text-destructive">{errors.transactionId}</p>}
            <p className="text-xs text-muted-foreground">You can find this in your payment confirmation SMS or app</p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg" disabled={isSubmitting || !paymentData.method}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Payment Info"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Your payment information is secure and will be verified by our team.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
