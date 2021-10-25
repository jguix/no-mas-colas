import { User } from "next-auth";

export enum DBTables {
  users = "users",
}

export type DBUser = User & {
  hashedPassword?: string | null;
};

export interface DB {
  saveUser(user: DBUser): Promise<void>;
  findUser(email: string): Promise<DBUser | undefined>;
}
