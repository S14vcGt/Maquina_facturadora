import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Cajas } from "../models/Cajas";
import { CajasResponse } from "../dtos/cajas.dto";

export class CajasController {
  static async createCajas(req: Request, res: Response) {
    const caja = await AppDataSource.getRepository(Cajas).create(req.body);
    const result = AppDataSource.getRepository(Cajas).save(caja);
    return res.send(result);
  }

  static async loadCajas(_req: Request, res: Response) {
    const cajas = await AppDataSource.getRepository(Cajas).find();
    const result = cajas.map((caja: Cajas) => {
      return new CajasResponse(caja, caja.password);
    });
    return res.json(result);
  }

  static async searchCajas(req: Request, res: Response) {
    const caja = await AppDataSource.getRepository(Cajas).find({
      where: { numero: parseInt(req.params.numero) },
      withDeleted: true,
    });
    if (caja.length > 0) {
      return res.json(new CajasResponse(caja[0], caja[0].password));
    } else {
      return res.status(404).json({ message: "No esta habilitada tal caja" });
    }
  }

  static async updateCaja(req: Request, res: Response) {
    const caja = await AppDataSource.getRepository(Cajas).findOneBy({
      numero: parseInt(req.params.numero),
    });
    if (!caja) {
      return res.status(404).json({ message: "No existe tal caja" });
    } else {
      AppDataSource.getRepository(Cajas).merge(caja, req.body);
      const result = await AppDataSource.getRepository(Cajas).save(caja);
      return res.json(result);
    }
  }

  static async deleteCaja(req: Request, res: Response) {
    const caja = await AppDataSource.getRepository(Cajas).softDelete(
      parseInt(req.params.numero)
    );
    return res.send(caja);
  }

  static async restoreCaja(req: Request, res: Response) {
    const result = await AppDataSource.getRepository(Cajas).restore(
      parseInt(req.params.numero)
    );
    return res.send(result);
  }
}
