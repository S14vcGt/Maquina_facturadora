import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { listan } from "./listan";
@Entity()
export class Productos extends BaseEntity {
  @PrimaryColumn()
  codigo: number;

  @Column({ nullable: false })
  precio: number;

  @Column("varchar", { length: 20 , nullable:false})
  nombre: string;

  @OneToMany(() => listan, (listan) => listan.producto)
  public listan: listan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
