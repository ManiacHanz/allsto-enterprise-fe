import mongoose from "mongoose"
const { Schema } = mongoose

const linksSchema = new Schema({
  uid: String,
  links: Array,
})

const userSchema = new Schema({
  uid: String,
  logo: String,
  name: String,
  email: String,
  address: String,
  receiveBy: String,
  currency: String,
  updated: { type: Date, default: Date.now },
})

export const Links = mongoose.models.Link || mongoose.model("Link", linksSchema)
