import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
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

  @Column({ type: Boolean })
  esCaja: boolean;

  @Column({ type: Boolean })
  admin: boolean;

  @Column({ type: Boolean })
  superAdmin: boolean;

  @OneToMany(() => audit, (audit) => audit.user)
  operaciones: audit[];

  @OneToMany(() => Facturas, (facturas) => facturas.caja, {
    onUpdate: "CASCADE",
  })
  facturas: Facturas[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  _name: string = "Users";
}
