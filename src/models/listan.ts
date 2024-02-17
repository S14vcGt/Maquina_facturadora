import {
  ManyToOne,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
} from "typeorm";
import { Facturas } from "./Facturas";
import { Productos } from "./Productos";

@Entity()
export class listan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Facturas, (factura) => factura.listan)
  public factura: Facturas;

  @ManyToOne(() => Productos, (producto) => producto.listan, { eager: true })
  public producto: Productos;
}
