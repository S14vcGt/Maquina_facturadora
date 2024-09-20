import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Facturas } from "./Facturas";
import { Productos } from "./Productos";

@Entity()
export class listan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Facturas, (factura) => factura.listan)
  public factura: Facturas;

  @ManyToOne(() => Productos, (producto) => producto.listan, { eager: true })
  public producto: Productos;

  _name: string = "listan";
}
