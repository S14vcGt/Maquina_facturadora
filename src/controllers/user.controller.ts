import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../models/Users";
import { UserResponse } from "../dtos/user.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { ResourceError } from "../middleware/error.middleware";
import { Xor } from "../helpers/validation.helper";
import { incremental } from "../helpers/incremental.helper";
import { audited } from "./audit.controller";

export class UsersController {
  static async createUser(req: Request, res: Response) {
    let userDto = plainToInstance(UserResponse, req.body);
    try {
      await validateOrReject(userDto);
      Xor(userDto);
      const aux = await incremental(userDto);
      const user = AppDataSource.getRepository(Users).create(aux);
      const result = await AppDataSource.getRepository(Users).save(user);
      audited([aux, result], "INSERT", req.user?._id);
      return res.status(201).json(result);
    } catch (errors: any) {
      throw new ResourceError(
        errors.message || errors.detail || JSON.stringify(errors[0].constraints)
      );
    }
  }

  static async loadUser(req: Request, res: Response) {
    let user: Users[];
    if (req.query.caja === "true") {
      user = await AppDataSource.getRepository(Users).find({
        where: { esCaja: true },
      });
    } else {
      user = await AppDataSource.getRepository(Users).find({
        where: { esCaja: false },
      });
    }
    const result = user.map((user: Users) => {
      let aux = instanceToPlain(user);
      return plainToInstance(UserResponse, aux, {
        excludeExtraneousValues: true,
        excludePrefixes: ["_"],
      });
    });
    return res.json(result);
  }

  static async searchCajas(req: Request, res: Response) {
    const numero = req.query.numero?.toString() || "";
    const caja = await AppDataSource.getRepository(Users).find({
      where: { numero: parseInt(numero), esCaja: true },
      withDeleted: true,
    });
    if (caja.length > 0) {
      let aux = instanceToPlain(caja[0]);
      return res.json(
        plainToInstance(UserResponse, aux, {
          excludeExtraneousValues: true,
        })
      );
    } else {
      return res.status(404).json({ message: "No esta habilitada tal caja" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const user = await AppDataSource.getRepository(Users).findOneBy({
      id: req.params.id,
    });
    if (!user) {
      return res.status(404).json({ message: "No existe tal usuario" });
    } else {
      let userDto = plainToInstance(UserResponse, req.body);
      try {
        await validateOrReject(userDto);
        AppDataSource.getRepository(Users).merge(user, userDto);
        let aux = user;
        const result = await AppDataSource.getRepository(Users).save(user);
        audited([aux, result], "INSERT", req.user?._id);
        return res.status(200).json(result);
      } catch (errors: any) {
        throw new ResourceError(
          errors.message ||
            errors.detail ||
            JSON.stringify(errors[0].constraints)
        );
      }
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const user = await AppDataSource.getRepository(Users).findOneBy({
      id: req.params.id,
    });
    if (!user) {
      return res.status(404).json({ message: "No existe tal usuario" });
    } else {
      const result = await AppDataSource.getRepository(Users).softDelete(
        req.params.id
      );
      const user2 = await AppDataSource.getRepository(Users).find({
        where: { id: req.params.id },
        withDeleted: true,
      });
      await audited([user, user2[0]], "SOFT REMOVE", req.user?._id);
      return res.json([user2, result]);
    }
  }

  static async restoreUser(req: Request, res: Response) {
    const user = await AppDataSource.getRepository(Users).find({
      where: { id: req.params.id },
      withDeleted: true,
    });
    if (user.length === 0) {
      return res.status(404).json({ message: "No existe tal usuarico" });
    } else {
      const result = await AppDataSource.getRepository(Users).restore(
        req.params.id
      );
      const user2 = await AppDataSource.getRepository(Users).find({
        where: { id: req.params.id },
      });
      await audited([user[0], user2[0]], "RESTORE", req.user?._id);
      return res.json([user2, result]);
    }
  }
}
