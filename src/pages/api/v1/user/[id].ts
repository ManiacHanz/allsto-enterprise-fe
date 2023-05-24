import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "@/lib/db/connect"
import { Users } from "@/lib/db/models"

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
      // Get data from your database
      const result = await Users.findOne({ id }, { _id: 0 })
      res.status(200).json(result)
      break
    case "PUT":
      // Update or create data in your database
      try {
        const result = await Users.findOneAndUpdate({ id }, body, {
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
