import type { NextApiRequest, NextApiResponse } from "next";
// import type { User } from '@/interfaces'
import { getRandomArbitrary, numToUSD, setPrecision } from "@/utils/common";

type User = {
  id: number | string;
  name?: string;
};

const mock = {
  id: "123",
  logo: "",
  name: `Web3 Sass Inc.`,
  email: "test email@test.com",
  address: "0x957328d804918017321809314732",
  receiveBy: "Ethereum",
  currency: "USDC",
};

export default function userHandler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { query, method } = req;
  const id = parseInt(query.id as string, 10);
  const name = query.name as string;

  switch (method) {
    case "GET":
      // Get data from your database
      res.status(200).json(mock);
      break;
    case "PUT":
      // Update or create data in your database
      res.status(200).json({ id, name: name || `User ${id}` });
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
