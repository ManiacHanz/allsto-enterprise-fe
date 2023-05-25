// @ts-nocheck
// TODO: type definition
import NextAuth, { Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { AdapterUser } from "next-auth/adapters"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import mongo from "@/lib/db/mongodb"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(mongo),
  session: {
    strategy: "jwt",
    maxAge: 24 * 3600,
  },
  callbacks: {
    async jwt({ token, account, ...rest }) {
      console.log("jwt callbacks", token, account, rest)
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({
      session,
      token,
      user,
    }: {
      session: Session
      token: JWT
      user: AdapterUser
    }) {
      console.log("session callbacks", token, session, user)
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
  },
}
export default NextAuth(authOptions)
