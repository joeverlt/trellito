import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  const path = request.nextUrl.pathname
  const isSigninPage = path.startsWith('/signin')
  const isSignUpPage = path.startsWith('/signup')

  if (session) {
    if (isSigninPage || isSignUpPage)
      return NextResponse.redirect(new URL('/boards', request.url))
    return NextResponse.next()
  } else {
    if (isSigninPage || isSignUpPage) return NextResponse.next()
    return NextResponse.redirect(
      new URL(`/signin?callbackUrl=${path}`, request.url)
    )
  }
}

export const config = {
  matcher: ['/boards/:path*', '/signin', '/signup']
}
