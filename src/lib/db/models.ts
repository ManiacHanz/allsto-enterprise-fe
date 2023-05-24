import mongoose from "mongoose"
const { Schema } = mongoose

const linksSchema = new Schema({
  userId: String,
  link: String,
  price: Number,
  item: String,
  updatedAt: { type: Date, default: Date.now },
})

const userSchema = new Schema({
  id: String,
  logo: String,
  name: String,
  email: String,
  address: String,
  receiveBy: String,
  currency: String,
  updatedAt: { type: Date, default: Date.now },
})

export const Links = mongoose.models.Link || mongoose.model("Link", linksSchema)
export const Users = mongoose.models.User || mongoose.model("User", userSchema)
