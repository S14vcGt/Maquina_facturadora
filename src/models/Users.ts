import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import { Facturas } from "./Facturas";
import { audit } from "./audit";

@Entity()
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  numero: number;

  @Column("varchar", { nullable: false })
  _password: string;

  @Column("varchar")
  rol: string;

  @OneToMany(() => audit, (audit) => audit.user)
  operaciones: audit[];

  @OneToMany(() => Facturas, (facturas) => facturas.caja, {
    onUpdate: "CASCADE",
  })
  facturas: Facturas[];

  _name: string = "Users";
}
