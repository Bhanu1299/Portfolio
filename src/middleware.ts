import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Check if user is trying to access admin routes
    if (pathname.startsWith('/admin')) {
      // Allow access to login page
      if (pathname === '/admin/login') {
        return NextResponse.next()
      }

      // Check if user is authenticated and has admin role
      if (!token || token.role !== 'admin' || !token.isActive) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl
        
        // Allow public routes
        if (!pathname.startsWith('/admin')) {
          return true
        }
        
        // Allow login page
        if (pathname === '/admin/login') {
          return true
        }
        
        // Require authentication for other admin routes
        return !!token
      }
    }
  }
)

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}