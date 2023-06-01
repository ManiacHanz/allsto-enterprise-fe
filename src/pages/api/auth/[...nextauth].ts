import NextAuth, { AuthOptions, Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
import type { AdapterUser } from "next-auth/adapters"
import GithubProvider from "next-auth/providers/github"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import mongo from "@/lib/db/mongodb"
import { Accounts } from "@/lib/db/models"

export const authOptions: AuthOptions = {
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
    maxAge: 24 * 60 * 60,
  },
  // jwt: {
  //   async encode(params: {
  //     token: JWT
  //     secret: string
  //     maxAge: number
  //   }): Promise<string> {
  //     // return a custom encoded JWT string
  //     // used to set cookie value for next-auth.session-token
  //     return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  //   },
  // },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async signIn({ user, account, profile, email, credentials }) {
      const item = await Accounts.findOne({
        providerAccountId: account?.providerAccountId,
      })
      if (item) {
        // if item does not exist, this is the first time the account sign in
        item["access_token"] = account?.["access_token"]
        await item.save()
      }

      return true
    },
    async jwt({ token, account, user, profile, trigger, session }) {
      // console.log("jwt callbacks", token, account, rest)
      // trigger === signUp means new user
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user, newSession, trigger }) {
      // console.log("session callbacks", token, session, user)
      // Send properties to the client, like an access_token from a provider.
      // @ts-ignore
      // 测试一下是不是登录态
      session.accessToken = token.accessToken
      return session
    },
  },
}
export default NextAuth(authOptions)
