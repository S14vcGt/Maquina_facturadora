import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Facturas } from "../models/Facturas";
import { Users } from "../models/Users";
import { Clientes } from "../models/Clientes";
import { Productos } from "../models/Productos";
import { listan } from "../models/listan";
import { FacturasResponse } from "../dtos/facturas.dto";
import { audited } from "./audit.controller";
import { ResourceError } from "../middleware/error.middleware";
//*find entrega un arreglo que puede estar
//*vacio, mientras que findOneBy entrega el objeto o null
//! para evitar problemas de tipos, referencio el arreglo y listo,la validacion de la
//!existencia de las entidades se hacen en el frontend, de manera que no llegue vacio

export class FacturasController {
  static async createFactura(req: Request, res: Response) {
    const { clienteId, cajaId, productos, monto_total, metodo_de_pago } =
      req.body;
    try {
      const factura = new Facturas();
      factura.caja = (
        await AppDataSource.getRepository(Users).find({
          where: { id: cajaId }, //* debo sacar el id de la jwt
        })
      )[0];
      factura.cliente = (
        await AppDataSource.getRepository(Clientes).find({
          where: { id: clienteId },
        })
      )[0];
      factura.monto_total = monto_total;
      factura.metodo_de_pago = metodo_de_pago;
      await AppDataSource.manager.save(factura);
      await audited(
        [
          { clienteId, cajaId, productos, monto_total, metodo_de_pago },
          factura,
        ],
        "INSERT",
        req.user?._id
      );
      for (let i = 0; i < productos.length; i++) {
        //* como el body entrega una lista de productos
        const { producto, cantidad } = productos[i]; //* uso un bucle for para asignarlos a la factura y guardar
        const listado = new listan(); //*la relacion en la tabla correspondiente
        listado.factura = factura;
        listado.producto = (
          await AppDataSource.getRepository(Productos).find({
            where: { codigo: producto },
          })
        )[0];
        listado.cantidad = cantidad;
        let aux = listado;
        await AppDataSource.manager.save(listado);
        await audited([aux, listado], "INSERT", req.user?._id);
      }
      return res.status(201).json(factura);
    } catch (errors: any) {
      console.log(errors);
      throw new ResourceError(
        errors.message || errors.detail || JSON.stringify(errors[0].constraints)
      );
    }
  }

  static async loadFacturas(_req: Request, res: Response) {
    const facturas = await AppDataSource.getRepository(Facturas).find();
    const result = facturas.map((factura: Facturas) => {
      return new FacturasResponse(factura);
    });
    return res.json(result);
  }

  static async searchFactura(req: Request, res: Response) {
    const numero = req.query.numero?.toString() || "";
    const factura = await AppDataSource.getRepository(Facturas).find({
      where: { numero: parseInt(numero) },
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
      id: req.params.id,
    });
    if (!factura) {
      return res.status(404).json({ message: "No existe tal factura" });
    } else {
      try {
        let aux = factura;
        AppDataSource.getRepository(Facturas).merge(factura, req.body);
        const result = await AppDataSource.getRepository(Facturas).save(
          factura
        );
        await audited([aux, result], "UPDATE", req.user?._id);
        return res.json(result);
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

  static async deleteFactura(req: Request, res: Response) {
    const factura = await AppDataSource.getRepository(Facturas).findOneBy({
      id: req.params.id,
    });
    if (!factura) {
      return res.status(404).json({ message: "No existe esta factura" });
    } else {
      const result = await AppDataSource.getRepository(Facturas).softDelete(
        req.params.id
      );
      const factura2 = await AppDataSource.manager.find(Facturas, {
        where: { id: req.params.id },
        withDeleted: true,
      });
      await audited([factura, factura2[0]], "SOFT REMOVE", req.user?._id);
      return res.json([factura2, result]);
    }
  }

  static async restoreFactura(req: Request, res: Response) {
    const factura = await AppDataSource.manager.find(Facturas, {
      where: { id: req.params.id },
      withDeleted: true,
    });
    if (factura.length === 0) {
      return res.status(404).json({ message: "No existe esta factura" });
    } else {
      const result = await AppDataSource.getRepository(Facturas).restore(
        req.params.id
      );
      const factura2 = await AppDataSource.getRepository(Facturas).find({
        where: { id: req.params.id },
      });
      await audited([factura[0], factura2[0]], "RESTORE", req.user?._id);
      return res.json([factura2, result]);
    }
  }
}
