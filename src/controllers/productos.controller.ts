import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../models/Productos";
import { ProductosResponse } from "../dtos/productos.dto";
import { plainToInstance, instanceToPlain } from "class-transformer";
import { validateOrReject } from "class-validator";

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
      return res.status(201).json(result);
    } catch (errors) {
      return res.status(422).json(errors);
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
    const producto = await AppDataSource.getRepository(Productos).find({
      where: { codigo: req.params.codigo },
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
      codigo: req.params.codigo,
    });
    if (!producto) {
      return res.status(404).json({ message: "No existe tal producto" });
    } else {
      try {
        let aux = plainToInstance(ProductosResponse, req.body);
        await validateOrReject(aux);
        AppDataSource.getRepository(Productos).merge(producto, aux);
        const result = await AppDataSource.getRepository(Productos).save(
          producto
        );
        return res.status(200).json(result);
      } catch (errors) {
        return res.status(422).json(errors);
      }
    }
  }

  static async deleteProducto(req: Request, res: Response) {
    const producto = await AppDataSource.getRepository(Productos).softDelete(
      parseInt(req.params.codigo)
    );
    return res.send(producto);
  }

  static async restoreProducto(req: Request, res: Response) {
    const result = await AppDataSource.getRepository(Productos).restore(
      parseInt(req.params.codigo)
    );
    return res.send(result);
  }
}
