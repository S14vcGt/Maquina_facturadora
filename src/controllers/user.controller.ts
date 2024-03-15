import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Users } from "../models/Users";
import { UserResponse } from "../dtos/user.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
//import { encrypt } from "../helpers/auth.helper";

export class UsersController {
  static async createUser(req: Request, res: Response) {
    let userDto = plainToInstance(UserResponse, req.body);
    try {
      await validateOrReject(userDto);
      //*userDto._password = encrypt(req.body._password);
      const user = AppDataSource.getRepository(Users).create(userDto);
      const result = await AppDataSource.getRepository(Users).save(user);

      return res.status(201).json(result);
    } catch (errors) {
      return res.status(422).json(errors);
    }
  }

  static async loadUser(req: Request, res: Response) {
    let user: Users[];
    if (req.query.caja === "true") {
      user = await AppDataSource.getRepository(Users).find({
        where: { caja: true },
      });
    } else {
      user = await AppDataSource.getRepository(Users).find({
        where: { caja: false },
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
    const caja = await AppDataSource.getRepository(Users).find({
      where: { numero: parseInt(req.params.numero), caja: true },
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
        const result = await AppDataSource.getRepository(Users).save(user);
        return res.json(result);
      } catch (errors) {
        return res.status(422).json(errors);
      }
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const caja = await AppDataSource.getRepository(Users).softDelete(
      req.params.id
    );
    return res.send(caja);
  }

  static async restoreUser(req: Request, res: Response) {
    const result = await AppDataSource.getRepository(Users).restore(
      req.params.id
    );
    return res.send(result);
  }
}
