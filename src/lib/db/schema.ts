import mongoose from 'mongoose'
const { Schema } = mongoose;

export const linksSchema = new Schema({
  uid: String,
  links: Array,
})


