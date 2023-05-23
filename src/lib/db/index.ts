import mongoose from "mongoose";
import { linksSchema } from "./schema";

console.log(mongoose);
// const db = mongoose.createConnection(MONGODB_URI)
// const db = mongoose.createConnection(process.env.MONGODB_URI!, {dbName: 'alls-to'})

// db.on('connection', () => console.log('[mongodb] Realyer DB Connected!'))
// db.on('error', err => console.warn('[mongodb] Realyer DB', err.message))

// const Links = mongoose.model('Links', linksSchema);

// mongoose.createConnection(T).then(console.log)
