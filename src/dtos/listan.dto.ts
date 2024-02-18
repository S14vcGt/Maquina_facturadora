import { listan } from "../models/listan";
import { ProductosResponse } from "./productos.dto";

export class listanResponse {
  cantidad: number;
  producto: ProductosResponse;

  constructor(listan: listan) {
    this.cantidad = listan.cantidad;
    this.producto = new ProductosResponse(listan.producto);
  }
}
