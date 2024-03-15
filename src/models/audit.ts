import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Entity()
export class audit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  table: string;

  @Column({ nullable: false })
  action: string;

  @ManyToOne(() => Users, (user) => user.operaciones)
  user: Users | null;

  @CreateDateColumn()
  createdAt: Date;
}
