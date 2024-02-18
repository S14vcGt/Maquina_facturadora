import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Clientes } from "../models/Clientes";
import { ClientesResponse } from "../dtos/clientes.dto";

export class ClientesController {
  static async createCliente(req: Request, res: Response) {
    const cliente = AppDataSource.getRepository(Clientes).create(req.body);
    const result = await AppDataSource.getRepository(Clientes).save(cliente);
    return res.send(result);
  }

  static async loadClientes(_req: Request, res: Response) {
    const clientes = await AppDataSource.getRepository(Clientes).find();
    const result = clientes.map((client) => {
      return new ClientesResponse(client);
    });
    return res.json(result);
  }

  static async searchCliente(req: Request, res: Response) {
    const cliente = await AppDataSource.getRepository(Clientes).find({
      where: { cedula: parseInt(req.params.cedula) },
      withDeleted: true,
    });
    if (cliente.length > 0) {
      return res.json(new ClientesResponse(cliente[0]));
    } else {
      return res.status(404).json({ message: "No existe tal cliente" });
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
    const cliente = await AppDataSource.getRepository(Clientes).softDelete(
      parseInt(req.params.cedula)
    );
    return res.send(cliente);
  }

  static async restoreCliente(req: Request, res: Response) {
    const result = await AppDataSource.getRepository(Clientes).restore(
      parseInt(req.params.cedula)
    );
    return res.send(result);
  }
}
