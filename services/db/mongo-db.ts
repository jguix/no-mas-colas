import { MongoClient } from "mongodb";
import { User } from "next-auth";
import { DB } from "./db";

export class MongoDB implements DB {
  static instance = null;
  client = null;

  static getInstance() {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  async saveUser(user: User) {
    const db = await this.getDB();
    const existingUser = await db
      .collection("users")
      .findOne({ email: user.email });

    if (!existingUser) {
      await db.collection("users").insertOne({
        email: user.email,
        name: user.name,
        image: user.image,
      });
    }
  }

  private async getDB() {
    const client = await this.connectToDatabase();
    return client.db("my-desk");
  }

  private async connectToDatabase() {
    if (!this.client) {
      this.client = await MongoClient.connect(process.env.MONGODB_URL);
      console.log(`Created mongodb client`);
      return this.client;
    } else {
      return this.client;
    }
  }
}
