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
@Entity()
export class Cajas {
  @PrimaryGeneratedColumn()
  numero: number;

  @Column("varchar", { length: 12, nullable: false })
  password: string;

  @OneToMany(() => Facturas, (facturas) => facturas.caja)
  facturas: Facturas[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
