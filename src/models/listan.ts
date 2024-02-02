import { ManyToOne, Column } from "typeorm";
import { Facturas } from "./Facturas";
import { Productos } from "./Productos";
export class listan {
  @Column()
  cantidad: number;
  @ManyToOne(() => Facturas, (factura) => factura.listan)
  public factura: Facturas;

  @ManyToOne(() => Productos, (producto) => producto.listan)
  public producto: Productos;
}
