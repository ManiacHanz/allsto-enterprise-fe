import type { NextApiRequest, NextApiResponse } from "next"
import { getRandomArbitrary, numToUSD, setPrecision } from "@/utils/common"
import { Links } from "@/lib/db/models"
import dbConnect from "@/lib/db/connect"

const mock = Array.from(
  { length: Math.ceil(getRandomArbitrary(25, 5)) },
  (x, idx) => {
    return {
      id: idx,
      link: `https://alls.to/Web3-Saas-Inc/payment${idx}`,
      price: numToUSD(setPrecision(Math.random() * 100, 2)),
      item: Math.random() > 0.5 ? "Monthly Basic Subscription" : undefined,
      createdAt: new Date().toLocaleString(),
    }
  }
)

export default async function linkHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body, method } = req
  const { id } = query

  await dbConnect()

  switch (method) {
    case "GET":
      // Get data from your database
      const result = await Links.aggregate([
        { $match: { userId: id } },
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
