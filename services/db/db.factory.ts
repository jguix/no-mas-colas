import { DB } from "./db";
import { MongoDB } from "./mongo-db";

export class DBFactory {
  static instance: DB;
  static getInstance(): DB {
    if (DBFactory.instance) return DBFactory.instance;

    if (process.env.DB_TYPE === "mongodb") {
      DBFactory.instance = new MongoDB();
      return DBFactory.instance;
    }

    throw new Error("Database type not defined in env.DB_TYPE");
  }
}
