import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Always allow NextAuth API routes to pass through
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  // Allow all other API routes
  if (pathname.startsWith("/api/")) {
    return NextResponse.next()
  }

  // Allow static files and Next.js internals
  if (pathname.startsWith("/_next") || pathname.startsWith("/favicon") || pathname.includes(".")) {
    return NextResponse.next()
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
    "/auth/error",
    "/courses",
    "/blog",
    "/store",
  ]

  // Check if current path is public
  const isPublicRoute = publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  // For protected routes, we'll handle authentication on the client side
  // to avoid middleware conflicts with NextAuth
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
}
