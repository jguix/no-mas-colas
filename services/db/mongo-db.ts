import { MongoClient } from "mongodb";
import { User } from "next-auth";
import { DB, DBTables } from "./db";

export class MongoDB implements DB {
  client = null;

  async saveUser(user: User) {
    const db = await this.getDB();
    const existingUser = await db
      .collection(DBTables.users)
      .findOne({ email: user.email });

    if (existingUser) {
      console.log(`User ${user.email} already exists`);
    } else {
      console.log(`Creating new user ${user.email}`);
      await db.collection(DBTables.users).insertOne({
        email: user.email,
        name: user.name,
        image: user.image,
      });
    }
  }

  private async getDB() {
    const client = await this.connectToDatabase();
    return client.db(process.env.MONGODB_DBNAME);
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
