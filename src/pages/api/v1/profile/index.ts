import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "@/lib/db/connect"
import { Accounts, Profiles } from "@/lib/db/models"
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export type User = {
  id: string
  logo?: string
  name?: string
  email?: string
  address?: string
  receiveBy?: string
  currency?: string
}

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body, method } = req
  const { id } = query

  await dbConnect()

  switch (method) {
    case "GET":
      try {
        const token = await getToken({ req, secret })
        const accessToken = token?.accessToken
        const item = await Accounts.findOne({ access_token: accessToken })

        let profile: {} | null = {}
        if (item) {
          const userId = item.userId
          profile = await Profiles.findOne({
            userId,
          })
        }

        res.status(200).json(profile)
      } catch (err) {
        console.log("error", err)
        res.status(500).end("service error")
      }

      break
    case "PUT":
      // Update or create data in your database
      try {
        const result = await Profiles.findOneAndUpdate({ id }, body, {
          projection: { _id: 0 },
          returnDocument: "after",
          upsert: true,
        })
        res.status(200).json(result)
      } catch (err) {
        console.log(err)
        res.status(500).end("Service unavailable")
      }
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
