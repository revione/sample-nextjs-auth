import NextAuth from "next-auth"
import type { NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcrypt-ts"
import { userManager } from "@/prisma/user-manager"

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      let isLoggedIn = !!auth?.user
      let isProtected = nextUrl.pathname.startsWith("/protected")

      if (isProtected) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/protected", nextUrl))
      }

      return true
    },
  },
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const user = await userManager.findByEmail(email)
        if (!user) return null
        const passwordsMatch = await compare(password, user.password)
        if (passwordsMatch)
          return { id: user.id, name: user.name, email: user.email }

        return null
      },
    }),
  ],
})
