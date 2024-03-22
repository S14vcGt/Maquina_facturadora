import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  DeleteDateColumn,
} from "typeorm";
import { listan } from "./listan";
@Entity()
export class Productos {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  codigo: string;

  @Column({ type: "float", nullable: false })
  precio: number;

  @Column("varchar", { nullable: false })
  nombre: string;

  @OneToMany(() => listan, (listan) => listan.producto, { onUpdate: "CASCADE" })
  public listan: listan[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  _name: string = "Productos";
}
