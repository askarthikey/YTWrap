import { MongoClient } from "mongodb";
const url = process.env.MONGO_URL || "";
const client = new MongoClient(url, {});
const clientPromise = client.connect();
const db = client.db("YTWrap");
const Videos = db.collection("Videos");
