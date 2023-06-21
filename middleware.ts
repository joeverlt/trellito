import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { JWT, getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const session: JWT | null = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })

  const path: string = request.nextUrl.pathname
  const isSigninPage: boolean = path.startsWith('/signin')
  const isSignUpPage: boolean = path.startsWith('/signup')
  const hasError: boolean = path.startsWith('/error')

  if (hasError) {
    const error: string = request.nextUrl.searchParams.get('error') as string
    const code: string = error?.split('. ')[1]
    const message: string = error?.split('. ')[0]
    switch (code) {
      case 'code:1':
      case 'code:2':
        return NextResponse.redirect(
          new URL(`/signin?error=${message}`, request.url)
        )
      case 'code:3':
        return NextResponse.redirect(
          new URL(`/signup?error=${message}`, request.url)
        )
    }
  }

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
  matcher: ['/boards/:path*', '/signin', '/signup', '/error']
}
