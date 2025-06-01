"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/contexts/cart-context"
import { Loader2, CreditCard, Lock, Smartphone } from "lucide-react"
import PaymentForm from "@/components/payment-form"

function CheckoutForm() {
  const { data: session } = useSession()
  const { state, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mobile">("mobile")

  // Convert USD to BDT (approximate rate: 1 USD = 110 BDT)
  const totalBDT = Math.round(state.total * 110)

  const handleCardSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsProcessing(true)
    setError("")

    try {
      // Simulate card payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, we'll just clear cart and redirect
      clearCart()
      router.push("/checkout/success")
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleMobilePaymentSuccess = () => {
    // Clear cart and redirect to success page
    clearCart()
    router.push("/checkout/success")
  }

  if (!session) {
    router.push("/auth/login?callbackUrl=/checkout")
    return null
  }

  if (state.items.length === 0) {
    router.push("/store")
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{item.type}</Badge>
                          {item.type === "product" && item.quantity && item.quantity > 1 && (
                            <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="font-medium">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Subtotal (USD):</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total (BDT):</span>
                    <span>৳{totalBDT}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue={session?.user?.name?.split(" ")[0] || ""} />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue={session?.user?.name?.split(" ")[1] || ""} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={session?.user?.email || ""} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as "card" | "mobile")}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="mobile" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Mobile Payment
                    </TabsTrigger>
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit Card
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="mobile" className="mt-6">
                    <PaymentForm
                      amount={totalBDT}
                      orderId={`order-${Date.now()}`}
                      onSuccess={handleMobilePaymentSuccess}
                    />
                  </TabsContent>

                  <TabsContent value="card" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5" />
                          Credit Card Payment
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleCardSubmit} className="space-y-6">
                          <div className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                              </div>
                              <div>
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" placeholder="MM/YY" />
                              </div>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" />
                              </div>
                              <div>
                                <Label htmlFor="cardName">Cardholder Name</Label>
                                <Input id="cardName" placeholder="John Doe" />
                              </div>
                            </div>
                          </div>

                          {error && (
                            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">{error}</div>
                          )}

                          <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                            {isProcessing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                <Lock className="mr-2 h-4 w-4" />
                                Pay ${state.total.toFixed(2)} USD
                              </>
                            )}
                          </Button>

                          <p className="text-xs text-muted-foreground text-center">
                            Your payment information is secure and encrypted.
                          </p>
                        </form>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return <CheckoutForm />
}
