import dbConnect from "@/lib/db/connect"
import { NextApiRequest, NextApiResponse } from "next"
import nodemailer from "nodemailer"

export default async function linkHandler(
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
      const mailOptions = {
        from: process.env.GOOGLE_ACCOUNT,
        to: "182490078@qq.com",
        subject: "Subject",
        text: "Email content",
      }
      const transporter = nodemailer.createTransport({
        // service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GOOGLE_ACCOUNT,
          pass: process.env.GOOGLE_SECRET,
        },
        tls: {
          ciphers: "SSLv3",
          maxVersion: "TLSv1.2",
        },
      })
      console.log(27, "email endpoint", transporter)

      try {
        const info = await transporter.sendMail(mailOptions)
        console.log("Email sent: " + info.response)
        res.status(200).json({ success: true, message: info.response })
      } catch (err) {
        console.log("error:", err)
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
