import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Facturas } from "./Facturas";

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

  _name: string = "Clientes";
}
