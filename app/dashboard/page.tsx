import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, ShoppingBag, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {session?.user?.name || "User"}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 in progress, 1 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">+5.5 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Average completion rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Courses</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Ethical Hacking Fundamentals</p>
                <p className="text-sm text-muted-foreground">Progress: 85%</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/courses">Continue</Link>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Web Application Security</p>
                <p className="text-sm text-muted-foreground">Progress: 45%</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/courses">Continue</Link>
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Network Penetration Testing</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/courses">Review</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">WiFi Pineapple</p>
                <p className="text-sm text-muted-foreground">Delivered</p>
              </div>
              <p className="font-medium">$99.99</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Rubber Ducky USB</p>
                <p className="text-sm text-muted-foreground">Shipped</p>
              </div>
              <p className="font-medium">$49.99</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Ethical Hacking eBook</p>
                <p className="text-sm text-muted-foreground">Downloaded</p>
              </div>
              <p className="font-medium">$24.99</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
