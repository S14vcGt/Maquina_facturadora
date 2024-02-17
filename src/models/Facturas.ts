import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  BaseEntity,
  DeleteDateColumn,
} from "typeorm";
import { Clientes } from "./Clientes";
import { Cajas } from "./Cajas";
import { listan } from "./listan";
@Entity()
export class Facturas extends BaseEntity {
  @PrimaryGeneratedColumn()
  numero: number;

  @Column({ type: "float", nullable: false })
  monto_total: number;

  @Column("varchar", { length: 100, nullable: false })
  metodo_de_pago: string;

  @ManyToOne(() => Clientes, (cliente) => cliente.facturas, { eager: true })
  cliente: Clientes;

  @ManyToOne(() => Cajas, (caja) => caja.facturas, { eager: true })
  caja: Cajas;

  @OneToMany(() => listan, (listan) => listan.factura, { eager: true })
  public listan: listan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
