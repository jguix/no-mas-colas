import { MongoClient } from "mongodb";
import { User } from "next-auth";
import { DB, DBTables, DBUser } from "./db";

export class MongoDB implements DB {
  client = null;

  async saveUser(user: DBUser) {
    const db = await this.getDB();
    await db.collection(DBTables.users).insertOne({
      email: user.email,
      name: user.name,
      image: user.image,
      hashedPassword: user.hashedPassword,
    });
  }

  async findUser(email: string) {
    const db = await this.getDB();
    const user = await db.collection(DBTables.users).findOne({ email });

    if (!user) console.log("User not found");
    return user;
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
