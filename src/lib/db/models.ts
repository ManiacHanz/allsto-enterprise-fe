import { ObjectId } from "mongodb"
import mongoose from "mongoose"
const { Schema } = mongoose

const linksSchema = new Schema(
  {
    userId: String,
    link: String,
    price: Number,
    item: String,
  },
  { timestamps: true }
)

const profileSchema = new Schema(
  {
    userId: String,
    logo: String,
    name: String,
    email: String,
    address: String,
    receiveBy: String,
    currency: String,
  },
  { timestamps: true }
)

const paySchema = new Schema(
  {
    userId: String,
    amount: Number,
    remark: String,
    name: String,
    email: String,
    network: String,
    payWith: String,
    type: Number,
    status: { type: Number, default: 0 },
    website: String,
    item: String,
  },
  { timestamps: true }
)

// This is for auto sign in
const accountSchema = new Schema({
  provider: String,
  type: String,
  providerAccountId: String,
  access_token: String,
  token_type: String,
  scope: String,
  userId: {
    type: ObjectId,
  },
  expires: String,
})

export const Links = mongoose.models.Link || mongoose.model("Link", linksSchema)
export const Profiles =
  mongoose.models.Profile || mongoose.model("Profile", profileSchema)
export const Payments =
  mongoose.models.Payment || mongoose.model("Payment", paySchema)
export const Accounts =
  mongoose.models.Account || mongoose.model("Account", accountSchema)
