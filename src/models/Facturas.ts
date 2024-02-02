import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Clientes } from "./Clientes";
import { Cajas } from "./Cajas";
import { listan } from "./listan";
@Entity()
export class Facturas {
  @PrimaryGeneratedColumn()
  numero: number;

  @Column()
  fecha: Date;

  @Column()
  monto_total: number;

  @Column("varchar", { length: 100 })
  metodo_de_pago: string;

  @ManyToOne(() => Clientes, (cliente) => cliente.facturas)
  cliente: Clientes;

  @ManyToOne(() => Cajas, (caja) => caja.facturas)
  caja: Cajas;

  @OneToMany(() => listan, (listan) => listan.factura)
  public listan: listan[];
}
