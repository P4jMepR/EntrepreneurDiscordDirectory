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

declare global {
  var __db: MongoClient | undefined;
}

async function getClient() {
  if (process.env.NODE_ENV === "production") {
    if (!db) {
      db = new MongoClient(MONGO_URI);
      await db.connect();
    }
    return db;
  }

  if (!global.__db) {
    global.__db = new MongoClient(MONGO_URI);
    await global.__db.connect();
  }
  return global.__db;
}

// Initialize the client without top-level await
const client = new MongoClient(MONGO_URI);

// Connect when the client is used
export async function connectDb() {
  if (!db) {
    db = await getClient();
  }
  return db;
}

export { client as db }; 