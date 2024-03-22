import { Users } from "../models/Users";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { generateToken, clearToken } from "../helpers/auth.helper";
import { AuthenticationError } from "../middleware/error.middleware";
export class AuthController {
  static async login(req: Request, res: Response) {
    const user = await AppDataSource.getRepository(Users).findOne({
      where: {
        numero: parseInt(req.body.numero),
        _password: req.body.password,
      },
    });
    if (user) {
      generateToken(res, user.id);
      const rol = user.esCaja ? "caja" : user.admin ? "admin" : "superAdmin";
      return res.status(201).json({
        id: user.id,
        numero: user.numero,
        rol: rol,
      });
    } else {
      throw new AuthenticationError("Autenticacion Fallida");
    }
  }

  static logout(_req: Request, res: Response) {
    clearToken(res);
    res.status(200).json({ message: "User logged out" });
  }
}
