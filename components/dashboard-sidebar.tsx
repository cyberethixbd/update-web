"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShieldCheck, Home, BookOpen, ShoppingBag, User, Settings, Menu } from "lucide-react"
import { useState } from "react"
import { useSession } from "next-auth/react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBag },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  const isAdmin = session?.user?.role === "admin"

  return (
    <>
      {/* Mobile Sidebar Trigger */}
      <div className="flex h-16 items-center px-4 border-b md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <MobileSidebar pathname={pathname} isAdmin={isAdmin} onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold">Cyber Ethix BD</span>
        </Link>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-background md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-bold">Cyber Ethix BD</span>
            </Link>
          </div>
          <ScrollArea className="flex-1 py-4">
            <nav className="grid gap-1 px-2">
              {navigation.map((item) => (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="justify-start"
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                </Button>
              ))}
              {isAdmin && (
                <Button variant="ghost" className="justify-start" asChild>
                  <Link href="/admin">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Admin Panel
                  </Link>
                </Button>
              )}
            </nav>
          </ScrollArea>
        </div>
      </div>
    </>
  )
}

function MobileSidebar({
  pathname,
  isAdmin,
  onNavigate,
}: {
  pathname: string
  isAdmin: boolean
  onNavigate: () => void
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2" onClick={onNavigate}>
          <ShieldCheck className="h-6 w-6 text-primary" />
          <span className="font-bold">Cyber Ethix BD</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {navigation.map((item) => (
            <Button
              key={item.name}
              variant={pathname === item.href ? "secondary" : "ghost"}
              className="justify-start"
              asChild
            >
              <Link href={item.href} onClick={onNavigate}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Link>
            </Button>
          ))}
          {isAdmin && (
            <Button variant="ghost" className="justify-start" asChild>
              <Link href="/admin" onClick={onNavigate}>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Admin Panel
              </Link>
            </Button>
          )}
        </nav>
      </ScrollArea>
    </div>
  )
}
