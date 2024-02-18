import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../models/Productos";
import { ProductosResponse } from "../dtos/productos.dto";

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
    const result = productos.map((producto: Productos) => {
      return new ProductosResponse(producto, producto.codigo);
    });
    return res.json(result);
  }

  static async searchProducto(req: Request, res: Response) {
    const producto = await AppDataSource.getRepository(Productos).find({
      where: { codigo: parseInt(req.params.codigo) },
      withDeleted: true,
    });
    if (producto.length > 0) {
      return res.json(new ProductosResponse(producto[0], producto[0].codigo));
    } else {
      return res.status(404).json({ message: "No existe tal producto" });
    }
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

  static async restoreProducto(req: Request, res: Response) {
    const result = await AppDataSource.getRepository(Productos).restore(
      parseInt(req.params.codigo)
    );
    return res.send(result);
  }
}
