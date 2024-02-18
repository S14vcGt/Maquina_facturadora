import { Productos } from "../models/Productos";

export class ProductosResponse {
  codigo: number;
  nombre: string;
  precio: number;

  constructor(producto: Productos, codigo: number = 0) {
    this.codigo = codigo;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
  }
}
