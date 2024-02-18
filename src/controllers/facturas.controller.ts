import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Facturas } from "../models/Facturas";
import { Cajas } from "../models/Cajas";
import { Clientes } from "../models/Clientes";
import { Productos } from "../models/Productos";
import { listan } from "../models/listan";
import { FacturasResponse } from "../dtos/facturas.dto";
//*find entrega un arreglo que puede estar
//*vacio, mientras que findOneBy entrega el objeto o null
//* para evitar problemas de compilacion, referencio el arreglo y listo,la validacion de la
//*existencia de las entidades se hacen en el frontend, de manera que no llegue vacio

export class FacturasController {
  static async createFactura(req: Request, res: Response) {
    const { cliente, caja, productos, monto_total, metodo_de_pago } = req.body;
    const factura = new Facturas();
    factura.caja = (
      await AppDataSource.getRepository(Cajas).find({
        where: { numero: parseInt(caja) },
      })
    )[0];
    factura.cliente = (
      await AppDataSource.getRepository(Clientes).find({
        where: { cedula: parseInt(cliente) },
      })
    )[0];
    factura.monto_total = monto_total;
    factura.metodo_de_pago = metodo_de_pago;
    await AppDataSource.manager.save(factura);
    for (let i = 0; i < productos.length; i++) {
      //* como el body entrega una lista de productos
      const { producto, cantidad } = productos[i]; //* uso un bucle for para asignarlos a la factura y guardar
      const listado = new listan(); //*la relacion en la tabla correspondiente
      listado.factura = factura;
      listado.producto = (
        await AppDataSource.getRepository(Productos).find({
          where: { codigo: parseInt(producto) },
        })
      )[0];
      listado.cantidad = cantidad;
      await AppDataSource.manager.save(listado);
    }
    res.json(factura);
  }

  static async loadFacturas(_req: Request, res: Response) {
    const facturas = await AppDataSource.getRepository(Facturas).find();
    const result = facturas.map((factura: Facturas) => {
      return new FacturasResponse(factura);
    });
    return res.json(result);
  }

  static async searchFactura(req: Request, res: Response) {
    const factura = await AppDataSource.getRepository(Facturas).find({
      where: { numero: parseInt(req.params.numero) },
      withDeleted: true,
    });
    if (factura.length > 0) {
      return res.json(new FacturasResponse(factura[0]));
    } else {
      return res.status(404).json({ message: "No existe tal factura " });
    }
  }

  static async updateFactura(req: Request, res: Response) {
    const factura = await AppDataSource.getRepository(Facturas).findOneBy({
      numero: parseInt(req.params.numero),
    });
    if (!factura) {
      return res.status(404).json({ message: "No existe tal factura" });
    } else {
      await AppDataSource.getRepository(Facturas).merge(factura, req.body);
      const result = await AppDataSource.getRepository(Facturas).save(factura);
      return res.json(result);
    }
  }

  static async deleteFactura(req: Request, res: Response) {
    const factura = await AppDataSource.getRepository(Facturas).softDelete(
      parseInt(req.params.numero)
    );
    return res.send(factura);
  }

  static async restoreFactura(req: Request, res: Response) {
    const result = await AppDataSource.getRepository(Facturas).restore(
      parseInt(req.params.numero)
    );
    res.send(result);
  }
}
