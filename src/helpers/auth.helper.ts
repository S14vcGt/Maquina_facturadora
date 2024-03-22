import jwt from "jsonwebtoken";
import { Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const generateToken = (res: Response, userId: string) => {
  const { JWT_SECRET = " " } = process.env;
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: "4h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "dev",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
};

const clearToken = (res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};

export { generateToken, clearToken };
