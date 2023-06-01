import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "@/lib/db/connect"
import { Accounts, Payments } from "@/lib/db/models"
import { getToken } from "next-auth/jwt"

const secret = process.env.NEXTAUTH_SECRET

export default async function payHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body, method } = req
  const { id, page = 1, pageSize = 20 } = query
  const limit = Number(pageSize)
  const skip = limit * (Number(page) - 1)

  await dbConnect()

  switch (method) {
    case "GET":
      const token = await getToken({ req, secret })
      const accessToken = token?.accessToken
      const item = await Accounts.findOne({ access_token: accessToken })

      let result = []
      if (item) {
        result = await Payments.aggregate([
          { $match: { userId: item.userId } },
          { $sort: { createdAt: -1 } },
          {
            $facet: {
              total: [{ $count: "total" }],
              data: [
                { $skip: skip },
                { $limit: limit },
                { $project: { __v: 0 } },
              ],
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
      const payment = await new Payments({ userId: id, ...body })
      const doc = await payment.save()

      res.status(200).json(doc)
      break
    default:
      res.setHeader("Allow", ["GET", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
