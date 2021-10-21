import { User } from "next-auth";

export interface DB {
  saveUser(user: User): void;
}
