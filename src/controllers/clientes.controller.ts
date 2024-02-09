import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Clientes } from "../models/Clientes";

export class ClientesController {
  static async createCliente(req: Request, res: Response) {
    const cliente = await AppDataSource.getRepository(Clientes).create(
      req.body
    );
    const result = AppDataSource.getRepository(Clientes).save(cliente);
    return res.send(result);
  }

  static async loadClientes(_req: Request, res: Response) {
    const clientes = await AppDataSource.getRepository(Clientes).find();
    return res.json(clientes);
  }

  static async searchCliente(req: Request, res: Response) {
    if (req.params.cedula){//!eliminar antes de entregar
      console.log("textualmente es "+req.params.cedula)
      const cliente = await AppDataSource.getRepository(Clientes).findOneBy({
        cedula: parseInt(req.params.cedula),
      });
      return res.json(cliente);
    }else{
      return res.sendStatus(404).json({"mensaje":"no lee la variable"})
    }
  }

  static async updateCliente(req: Request, res: Response) {
    const cliente = await AppDataSource.getRepository(Clientes).findOneBy({
      cedula: parseInt(req.params.cedula),
    });
    if (!cliente) {
      return res.status(404).json({ message: "No existe tal cliente" });
    } else {
      AppDataSource.getRepository(Clientes).merge(cliente, req.body);
      const result = await AppDataSource.getRepository(Clientes).save(cliente);
      return res.json(result);
    }
  }

  static async deleteCliente(req: Request, res: Response) {
    const cliente = await AppDataSource.getRepository(Clientes).delete(
      parseInt(req.params.cedula)
    );
    return res.send(cliente);
  }
}
