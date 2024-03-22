import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../models/Productos";
import { ProductosResponse } from "../dtos/productos.dto";
import { plainToInstance, instanceToPlain } from "class-transformer";
import { validateOrReject } from "class-validator";
import { ResourceError } from "../middleware/error.middleware";
import { audited } from "./audit.controller";
export class ProductosController {
  static async createProductos(req: Request, res: Response) {
    let productoDto = plainToInstance(ProductosResponse, req.body);
    try {
      await validateOrReject(productoDto);
      const producto = await AppDataSource.getRepository(Productos).create(
        productoDto
      );
      const result = await AppDataSource.getRepository(Productos).save(
        producto
      );
      await audited([producto, result], "INSERT", req.user?._id);
      return res.status(201).json(result);
    } catch (errors: any) {
      throw new ResourceError(
        errors.message || errors.detail || JSON.stringify(errors[0].constraints)
      );
    }
  }

  static async loadProductos(_req: Request, res: Response) {
    const productos = await AppDataSource.getRepository(Productos).find();
    const result = productos.map((producto: Productos) => {
      let aux = instanceToPlain(producto);
      return plainToInstance(ProductosResponse, aux, {
        excludeExtraneousValues: true,
      });
    });
    return res.status(200).json(result);
  }

  static async searchProducto(req: Request, res: Response) {
    const codigo = req.query.codigo?.toString() || "";
    const producto = await AppDataSource.getRepository(Productos).find({
      where: { codigo: codigo },
      withDeleted: true,
    });
    if (producto.length > 0) {
      let aux = instanceToPlain(producto[0]);
      return res.status(200).json(
        plainToInstance(ProductosResponse, aux, {
          excludeExtraneousValues: true,
        })
      );
    } else {
      return res.status(404).json({ message: "No existe tal producto" });
    }
  }

  static async updateProducto(req: Request, res: Response) {
    const producto = await AppDataSource.getRepository(Productos).findOneBy({
      id: req.params.id,
    });
    if (!producto) {
      return res.status(404).json({ message: "No existe tal producto" });
    } else {
      try {
        let aux = plainToInstance(ProductosResponse, req.body);
        await validateOrReject(aux);
        let aux2 = producto;
        AppDataSource.getRepository(Productos).merge(producto, aux);
        const result = await AppDataSource.getRepository(Productos).save(
          producto
        );
        await audited([aux2, producto], "UPDATE", req.user?._id);
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

  static async deleteProducto(req: Request, res: Response) {
    const producto = await AppDataSource.getRepository(Productos).findOneBy({
      id: req.params.id,
    });
    if (!producto) {
      return res.status(404).json({ message: "No existe tal producto" });
    } else {
      const result = await AppDataSource.getRepository(Productos).softDelete(
        req.params.id
      );
      const producto2 = await AppDataSource.getRepository(Productos).find({
        where: { id: req.params.id },
        withDeleted: true,
      });
      await audited([producto, producto2[0]], "SOFT REMOVE", req.user?._id);
      return res.json([producto2, result]);
    }
  }

  static async restoreProducto(req: Request, res: Response) {
    const producto = await AppDataSource.getRepository(Productos).find({
      where: { id: req.params.id },
      withDeleted: true,
    });
    if (producto.length === 0) {
      return res.status(404).json({ message: "No existe tal producto" });
    } else {
      const result = await AppDataSource.getRepository(Productos).restore(
        req.params.id
      );
      const producto2 = await AppDataSource.getRepository(Productos).find({
        where: { id: req.params.id },
      });
      await audited([producto[0], producto2[0]], "RESTORE", req.user?._id);
      return res.json([producto2, result]);
    }
  }
}
