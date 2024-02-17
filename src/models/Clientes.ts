import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Facturas } from "./Facturas";

@Entity()
export class Clientes  {
  @PrimaryColumn()
  cedula: number;

  @Column("varchar", { length: 20, nullable: false })
  nombre: string;

  @Column("varchar", { length: 20, nullable: false })
  apellido: string;

  @Column("varchar", { length: 100, nullable: false })
  direccion: string;

  @Column("varchar", { length: 12, nullable: false })
  telefono: string;

  @OneToMany(() => Facturas, (facturas) => facturas.cliente)
  facturas: Facturas[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
