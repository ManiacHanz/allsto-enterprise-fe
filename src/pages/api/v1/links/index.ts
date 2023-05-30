import type { NextApiRequest, NextApiResponse } from "next"
import { Accounts, Links } from "@/lib/db/models"
import dbConnect from "@/lib/db/connect"
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export default async function linkHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body, method } = req
  const { id } = query

  await dbConnect()

  switch (method) {
    case "GET":
      const token = await getToken({ req, secret })
      const accessToken = token?.accessToken
      const item = await Accounts.findOne({ access_token: accessToken })

      let result = []
      if (item) {
        result = await Links.aggregate([
          { $match: { userId: item.userId } },
          { $sort: { createdAt: -1 } },
          {
            $facet: {
              total: [{ $count: "total" }],
              data: [{ $skip: 0 }, { $limit: 20 }, { $project: { __v: 0 } }],
            },
          },
          {
            $project: {
              total: { $arrayElemAt: ["$total.total", 0] },
              data: 1,
            },
          },
        ])
      }

      res.status(200).json(result[0])
      break
    case "POST":
      try {
        const link = new Links({ userId: id, ...body })
        await link.save()

        res.status(200).json(link)
      } catch (err) {
        console.log(err)
        res.status(500).end("Service error")
      }
      break
    case "PUT":
      // Update or create data in your database
      const doc = await Links.findOneAndUpdate({ _id: id }, body, {
        projection: { _id: 0 },
        returnDocument: "after",
      })
      res.status(200).json(doc)
      break
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
