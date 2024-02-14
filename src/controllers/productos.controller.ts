import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../models/Productos";

export class ProductosController {
  static async createProductos(req: Request, res: Response) {
    const producto = await AppDataSource.getRepository(Productos).create(
      req.body
    );
    const result = AppDataSource.getRepository(Productos).save(producto);
    return res.send(result);
  }

  static async loadProductos(_req: Request, res: Response) {
    const productos = await AppDataSource.getRepository(Productos).find();
    return res.json(productos);
  }

  static async searchProducto(req: Request, res: Response) {
    const producto = await AppDataSource.getRepository(Productos).find({
      where: { codigo: parseInt(req.params.codigo) },
      withDeleted: true,
    });
    return res.json(producto);
  }

  static async updateProducto(req: Request, res: Response) {
    const producto = await AppDataSource.getRepository(Productos).findOneBy({
      codigo: parseInt(req.params.codigo),
    });
    if (!producto) {
      return res.status(404).json({ message: "No existe tal producto" });
    } else {
      AppDataSource.getRepository(Productos).merge(producto, req.body);
      const result = await AppDataSource.getRepository(Productos).save(
        producto
      );
      return res.json(result);
    }
  }

  static async deleteProducto(req: Request, res: Response) {
    const producto = await AppDataSource.getRepository(Productos).softDelete(
      parseInt(req.params.codigo)
    );
    return res.send(producto);
  }
}
