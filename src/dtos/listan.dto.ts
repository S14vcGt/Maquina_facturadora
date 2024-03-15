import { instanceToPlain, plainToInstance } from "class-transformer";
import { listan } from "../models/listan";
import { ProductosResponse } from "./productos.dto";

export class listanResponse {
  cantidad: number;
  producto: ProductosResponse;

  constructor(listan: listan) {
    this.cantidad = listan.cantidad;
    let aux = instanceToPlain(listan.producto);
    this.producto = plainToInstance(ProductosResponse, aux, {
      excludeExtraneousValues: true,
    });
  }
}
