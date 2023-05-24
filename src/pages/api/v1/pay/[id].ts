import type { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "@/lib/db/connect"
import { Payments } from "@/lib/db/models"

export default async function payHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body, method } = req
  const { id } = query

  await dbConnect()

  switch (method) {
    case "GET":
      const result = await Payments.aggregate([
        { $match: { userId: id } },
        {
          $facet: {
            total: [{ $count: "total" }],
            data: [
              { $skip: 0 },
              { $limit: 20 },
              { $project: { _id: 0, __v: 0 } },
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
      console.log(36, result)
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
