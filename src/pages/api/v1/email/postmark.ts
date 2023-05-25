import dbConnect from "@/lib/db/connect"
import { NextApiRequest, NextApiResponse } from "next"
const postmark = require("postmark")

const client = new postmark.ServerClient(process.env.POSTMARK_TOKEN)

export default async function emailHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { query, body, method } = req
  const { id } = query

  await dbConnect()

  switch (method) {
    case "GET":
      res.status(200).json({})
      break
    case "POST":
      console.log("postmark")
      try {
        const result = await client.sendEmail({
          From: "abby@coloso.io",
          To: "abby@coloso.io",
          Subject: "Test",
          TextBody: "Hello from Postmark!",
        })
        console.log("result: ", result)
        res.status(200).end("sucess")
      } catch (err) {
        console.log("error: ", err)
        res.status(500).end("service error")
      }

      break
    case "PUT":
      res.status(200).json({})
      break
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
