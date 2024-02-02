import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { Facturas } from "./Facturas";

@Entity()
export class Clientes {
  @PrimaryColumn()
  cedula: number;

  @Column("varchar", { length: 20 })
  nombre: string;

  @Column("varchar", { length: 20 })
  apellido: string;

  @Column("varchar", { length: 100 })
  direccion: string;

  @Column()
  telefono: string;

  @OneToMany(() => Facturas, (facturas) => facturas.cliente)
  facturas: Facturas[];
}
