import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Users } from "../models/Users";
import * as dotenv from "dotenv";
import { AppDataSource } from "../data-source";
import { AuthenticationError } from "./error.middleware";
dotenv.config();

const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    let token = req.cookies.jwt;

    if (!token) {
      throw new AuthenticationError("Token not found");
    }

    const jwtSecret = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

    if (!decoded || !decoded.userId) {
      throw new AuthenticationError("userId not found");
    }

    const user = await AppDataSource.getRepository(Users).findOneBy({
      id: decoded.userId,
    });

    if (!user) {
      throw new AuthenticationError("User not found");
    }
    const aux = {
      _id: user.id,
      numero: user.numero,
      rol: user.esCaja ? "caja" : user.admin ? "admin" : "superAdmin",
    };
    req.user = aux;
    next();
  } catch (e: any) {
    throw new AuthenticationError(e.message);
  }
};

export { authenticate };
