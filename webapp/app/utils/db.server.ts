import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../../../.env') });

const MONGO_URI = process.env.MONGO_USERNAME && process.env.MONGO_PASSWORD
  ? `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST || 'localhost'}:${process.env.MONGO_PORT || '27117'}/furlough`
  : 'mongodb://localhost:27017/furlough';

let db: MongoClient;

async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    await client.db().command({ ping: 1 }); // Test connection
    console.log("Successfully connected to MongoDB.");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  }
}

declare global {
  var __db: MongoClient | undefined;
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
  db = await connectDB();
} else {
  if (!global.__db) {
    global.__db = await connectDB();
  }
  db = global.__db;
}

export { db }; 