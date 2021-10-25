import { compareSync, hashSync } from "bcryptjs";

export const hashPassword = (password: string) => hashSync(password, 12);

export const verifyPassword = (
  password: string | undefined,
  hashedPassword: string | undefined
) => password && hashedPassword && compareSync(password, hashedPassword);
