import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthOptions, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'

const url = process.env.API_URL

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_API_KEY as string,
      clientSecret: process.env.GOOGLE_API_SECRET as string
    }),
    Credentials({
      id: 'signin',
      name: 'signin',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials?: Record<'email' | 'password', string>) {
        const res = await fetch(`${url}/auth/signin`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        if (res.ok && data) return { ...data.user }
        return null
      }
    }),
    Credentials({
      id: 'signup',
      name: 'signup',
      credentials: {
        name: { label: 'name', type: 'text' },
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(
        credentials?: Record<'email' | 'password' | 'name', string>
      ) {
        const res = await fetch(`${url}/auth/signup`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        })
        const data = await res.json()
        if (res.ok && data) return { ...data.user }
        return null
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user: User | AdapterUser }) => {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session.user) {
        session.user.name = token.name
        session.user.email = token.email
      }
      return session
    }
  },
  pages: {
    signIn: '/signin',
    newUser: '/signup'
  }
}

export default NextAuth(authOptions)
