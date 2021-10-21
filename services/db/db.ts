import { User } from "next-auth";

export enum DBTables {
  users = "users",
}

export interface DB {
  saveUser(user: User): Promise<void>;
}
