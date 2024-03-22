import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Clientes } from "../models/Clientes";
import { ClientesResponse } from "../dtos/clientes.dto";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { ResourceError } from "../middleware/error.middleware";
import { audited } from "./audit.controller";

export class ClientesController {
  static async createCliente(req: Request, res: Response) {
    let clienteDto: ClientesResponse = plainToInstance(
      ClientesResponse,
      req.body
    );
    try {
      await validateOrReject(clienteDto);
      const cliente = AppDataSource.getRepository(Clientes).create(clienteDto);
      const result = await AppDataSource.getRepository(Clientes).save(cliente);
      await audited([clienteDto, cliente], "INSERT", req.user?._id);
      return res.status(201).json(result);
    } catch (errors: any) {
      console.log(errors);
      throw new ResourceError(
        errors.message || errors.detail || JSON.stringify(errors[0].constraints)
      );
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
    const cedula = req.query.cedula?.toString() || "";
    const cliente = await AppDataSource.getRepository(Clientes).find({
      where: { cedula: parseInt(cedula) },
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
      id: req.params.id,
    });
    if (!cliente) {
      return res.status(404).json({ message: "No existe tal cliente" });
    } else {
      try {
        let aux = plainToInstance(ClientesResponse, req.body);
        await validateOrReject(aux);
        let aux2 = cliente;
        AppDataSource.getRepository(Clientes).merge(cliente, aux);
        const result = await AppDataSource.getRepository(Clientes).save(
          cliente
        );
        await audited([aux2, cliente], "UPDATE", req.user?._id);
        return res.status(200).json(result);
      } catch (errors: any) {
        console.log(errors);
        throw new ResourceError(
          errors.message ||
            errors.detail ||
            JSON.stringify(errors[0].constraints)
        );
      }
    }
  }

  static async deleteCliente(req: Request, res: Response) {
    const cliente = await AppDataSource.getRepository(Clientes).findOneBy({
      id: req.params.id,
    });
    if (!cliente) {
      return res.status(404).json({ message: "No existe tal cliente" });
    } else {
      const result = await AppDataSource.getRepository(Clientes).softDelete(
        req.params.id
      );
      const cliente2 = await AppDataSource.getRepository(Clientes).find({
        where: { id: req.params.id },
        withDeleted: true,
      });
      await audited([cliente, cliente2[0]], "SOFT REMOVE", req.user?._id);
      return res.json([cliente2, result]);
    }
  }

  static async restoreCliente(req: Request, res: Response) {
    const cliente = await AppDataSource.getRepository(Clientes).find({
      where: { id: req.params.id },
      withDeleted: true,
    });
    if (cliente.length === 0) {
      return res.status(404).json({ message: "No existe tal cliente" });
    } else {
      const result = await AppDataSource.getRepository(Clientes).restore(
        req.params.id
      );
      const cliente2 = await AppDataSource.getRepository(Clientes).find({
        where: { id: req.params.id },
      });
      await audited([cliente[0], cliente2[0]], "RESTORE", req.user?._id);
      return res.json([cliente2, result]);
    }
  }
}
