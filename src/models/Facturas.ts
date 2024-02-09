import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Clientes } from "./Clientes";
import { Cajas } from "./Cajas";
import { listan } from "./listan";
@Entity()
export class Facturas extends BaseEntity {
  @PrimaryGeneratedColumn()
  numero: number;

  @Column({ nullable: false })
  monto_total: number;

  @Column("varchar", { length: 100 })
  metodo_de_pago: string;

  @ManyToOne(() => Clientes, (cliente) => cliente.facturas)
  cliente: Clientes;

  @ManyToOne(() => Cajas, (caja) => caja.facturas)
  caja: Cajas;

  @OneToMany(() => listan, (listan) => listan.factura)
  public listan: listan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
