import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Clientes } from "../models/Clientes";
import { ClientesResponse } from "../dtos/clientes.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

export class ClientesController {
  static async createCliente(req: Request, res: Response) {
    let clienteDto: ClientesResponse = plainToInstance(
      ClientesResponse,
      req.body
    );
    try {
      await validateOrReject(clienteDto);
      const cliente = await AppDataSource.getRepository(Clientes).create(
        clienteDto
      );
      const result = await AppDataSource.getRepository(Clientes).save(cliente);
      return res.status(201).json(result);
    } catch (errors) {
      return res.status(422).json(errors);
    }
  }

  static async loadClientes(_req: Request, res: Response) {
    const clientes = await AppDataSource.getRepository(Clientes).find();
    const result = clientes.map((client) => {
      let aux = instanceToPlain(client);
      return plainToInstance(ClientesResponse, aux, {
        excludeExtraneousValues: true,
      });
    });
    return res.json(result);
  }

  static async searchCliente(req: Request, res: Response) {
    const cliente = await AppDataSource.getRepository(Clientes).find({
      where: { cedula: parseInt(req.params.cedula) },
      withDeleted: true,
    });
    if (cliente.length > 0) {
      let aux = instanceToPlain(cliente[0]);
      return res.json(
        plainToInstance(ClientesResponse, aux, {
          excludeExtraneousValues: true,
        })
      );
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
      try {
        let aux = plainToInstance(ClientesResponse, req.body);
        await validateOrReject(aux);
        AppDataSource.getRepository(Clientes).merge(cliente, aux);
        const result = await AppDataSource.getRepository(Clientes).save(
          cliente
        );
        return res.json(result);
      } catch (errors) {
        return res.status(422).json(errors);
      }
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
