import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import type { NextAuthOptions, Session, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import { AdapterUser } from 'next-auth/adapters'
import { User as UserModel } from '@/lib/mongoose/models/User'
import Tokenize from '@/lib/utils/tokenize'
import { connection } from '@/lib/mongoose'

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
        if (credentials) {
          const { email, password } = credentials
          await connection()
          const user = await UserModel.findOne({ email })
          if (!user) throw new Error('User not found. code:1')
          const isMatch = await user.comparePassword(password)
          if (!isMatch) throw new Error('Invalid email or password. code:2')
          const token: string = Tokenize.encode(user, '12h')
          if (user) return { id: user._id, name: user.name, email, token }
        }
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
        if (credentials) {
          const { name, email, password } = credentials
          await connection()
          let user = await UserModel.findOne({ email })
          if (user) throw new Error('Username already exists. code:3')
          user = new UserModel({ name, email, password })
          user.encryptPassword()
          await user.save()
          const token: string = Tokenize.encode(user, '12h')
          return { id: user._id, name, email, token }
        }
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
        session.user.id = token.id as string
        session.user.name = token.name
        session.user.email = token.email
      }
      return session
    }
  },
  pages: {
    signIn: '/signin',
    newUser: '/signup',
    error: '/error'
  }
}

export default NextAuth(authOptions)
