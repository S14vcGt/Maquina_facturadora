import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from "typeorm";
import { Facturas } from "./Facturas";
//import { audited } from "../helpers/audited.helper";

@Entity()
export class Clientes {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  cedula: number;

  @Column("varchar", { nullable: false })
  nombre: string;

  @Column("varchar", { nullable: false })
  apellido: string;

  @Column("varchar", { nullable: false })
  direccion: string;

  @Column("varchar", { nullable: false })
  telefono: string;

  @OneToMany(() => Facturas, (facturas) => facturas.cliente, {
    onUpdate: "CASCADE",
  })
  facturas: Facturas[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  _name: string = "Clientes";
}
