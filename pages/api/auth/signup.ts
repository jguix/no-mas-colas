import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../../services/auth/auth";
import { DBFactory } from "../../../services/db/db.factory";
import * as EmailValidator from "email-validator";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;
  const isEmailValid = EmailValidator.validate(email);
  const isPasswordValid = password && password.trim().length >= 8;

  if (!isEmailValid) {
    res.status(422).json({
      message: "Invalid email",
    });
    return;
  }

  if (!isPasswordValid) {
    res.status(422).json({
      message: "Invalid password, it should be at least 8 characters long",
    });
    return;
  }

  const db = DBFactory.getInstance();
  const existingUser = await db.findUser(email);

  if (existingUser) {
    res.status(422).json({
      message: "User already exists",
    });
    return;
  }

  const hashedPassword = hashPassword(password);

  await db.saveUser({
    email,
    hashedPassword,
  });

  res.status(201).json({ message: "Created user" });
};

export default handler;
