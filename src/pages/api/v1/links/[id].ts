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
  res: NextApiResponse<typeof mock>
) {
  const { query, method } = req
  const id = parseInt(query.id as string, 10)

  await dbConnect()
  const result = await Links.find({})

  res.status(200).json(mock)

  // switch (method) {
  //   case 'GET':
  //     // Get data from your database
  //     res.status(200).json(mock)
  //     break
  //   case 'PUT':
  //     // Update or create data in your database
  //     res.status(200).json({ id, name: name || `User ${id}` })
  //     break
  //   default:
  //     res.setHeader('Allow', ['GET', 'PUT'])
  //     res.status(405).end(`Method ${method} Not Allowed`)
  // }
}
