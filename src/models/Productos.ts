import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { listan } from "./listan";
@Entity()
export class Productos {
  @PrimaryColumn()
  codigo: number;

  @Column()
  precio: number;

  @Column("varchar", { length: 20 })
  nombre: string;

  @OneToMany(() => listan, (listan) => listan.producto)
  public listan: listan[];
}
