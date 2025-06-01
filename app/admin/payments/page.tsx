"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Eye, Search } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Payment {
  _id: string
  userEmail: string
  method: string
  mobileNumber: string
  transactionId: string
  amount: number
  status: "pending" | "verified" | "rejected"
  createdAt: string
  orderId?: string
}

export default function AdminPaymentsPage() {
  const { toast } = useToast()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null)
  const [verificationNotes, setVerificationNotes] = useState("")
  const [statusFilter, setStatusFilter] = useState("pending")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchPayments()
  }, [statusFilter])

  const fetchPayments = async () => {
    try {
      const response = await fetch(`/api/admin/payments?status=${statusFilter}`)
      const data = await response.json()
      setPayments(data.payments || [])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch payments",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyPayment = async (paymentId: string, status: "verified" | "rejected") => {
    try {
      const response = await fetch(`/api/admin/payments/${paymentId}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status,
          notes: verificationNotes,
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Payment ${status} successfully`,
        })
        fetchPayments()
        setSelectedPayment(null)
        setVerificationNotes("")
      } else {
        throw new Error("Verification failed")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify payment",
        variant: "destructive",
      })
    }
  }

  const filteredPayments = payments.filter(
    (payment) =>
      payment.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.mobileNumber.includes(searchTerm),
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "verified":
        return <Badge className="bg-green-500">Verified</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getMethodBadge = (method: string) => {
    const colors = {
      bkash: "bg-pink-500",
      nagad: "bg-orange-500",
      rocket: "bg-purple-500",
    }
    return <Badge className={colors[method as keyof typeof colors] || "bg-gray-500"}>{method.toUpperCase()}</Badge>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
        <p className="text-muted-foreground">Review and verify mobile payment submissions</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by email, transaction ID, or mobile number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payments ({filteredPayments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Mobile Number</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment.userEmail}</TableCell>
                  <TableCell>{getMethodBadge(payment.method)}</TableCell>
                  <TableCell className="font-mono">{payment.mobileNumber}</TableCell>
                  <TableCell className="font-mono">{payment.transactionId}</TableCell>
                  <TableCell>৳{payment.amount}</TableCell>
                  <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" onClick={() => setSelectedPayment(payment)}>
                          <Eye className="h-4 w-4 mr-1" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Payment Review</DialogTitle>
                          <DialogDescription>Review and verify this payment submission</DialogDescription>
                        </DialogHeader>
                        {selectedPayment && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <Label>User Email</Label>
                                <p className="font-mono">{selectedPayment.userEmail}</p>
                              </div>
                              <div>
                                <Label>Payment Method</Label>
                                <p>{getMethodBadge(selectedPayment.method)}</p>
                              </div>
                              <div>
                                <Label>Mobile Number</Label>
                                <p className="font-mono">{selectedPayment.mobileNumber}</p>
                              </div>
                              <div>
                                <Label>Transaction ID</Label>
                                <p className="font-mono">{selectedPayment.transactionId}</p>
                              </div>
                              <div>
                                <Label>Amount</Label>
                                <p className="font-bold">৳{selectedPayment.amount}</p>
                              </div>
                              <div>
                                <Label>Status</Label>
                                <p>{getStatusBadge(selectedPayment.status)}</p>
                              </div>
                            </div>

                            {selectedPayment.status === "pending" && (
                              <>
                                <div>
                                  <Label htmlFor="notes">Verification Notes (Optional)</Label>
                                  <Textarea
                                    id="notes"
                                    placeholder="Add any notes about this verification..."
                                    value={verificationNotes}
                                    onChange={(e) => setVerificationNotes(e.target.value)}
                                  />
                                </div>
                                <DialogFooter className="gap-2">
                                  <Button
                                    variant="destructive"
                                    onClick={() => handleVerifyPayment(selectedPayment._id, "rejected")}
                                  >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Reject
                                  </Button>
                                  <Button onClick={() => handleVerifyPayment(selectedPayment._id, "verified")}>
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Verify
                                  </Button>
                                </DialogFooter>
                              </>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredPayments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">No payments found for the selected criteria.</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
