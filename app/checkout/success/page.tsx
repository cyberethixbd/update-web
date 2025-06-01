import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, BookOpen } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
            <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-xl text-muted-foreground">Thank you for your purchase. Your order has been confirmed.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>What's Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
                <BookOpen className="h-8 w-8 text-primary" />
                <h3 className="font-medium">Access Your Courses</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Start learning immediately with lifetime access
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
                <Download className="h-8 w-8 text-primary" />
                <h3 className="font-medium">Download Resources</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Access downloadable materials and certificates
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/courses">Browse More Courses</Link>
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          A confirmation email has been sent to your email address with order details and access instructions.
        </p>
      </div>
    </div>
  )
}
