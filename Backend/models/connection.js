//database connection file : mongodb + express
//for connection 'mongoose' client is used

import mongoose from 'mongoose';
const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mernbatch56_api";
mongoose.connect(url);
console.log("Successfully connected to mongodb database...");
