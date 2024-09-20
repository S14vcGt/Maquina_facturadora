import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  Generated,
} from 'typeorm';
import { Clientes } from './Clientes';
import { Users } from './Users';
import { listan } from './listan';
@Entity()
export class Factura {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('increment')
  numero: number;

  @Column({ type: 'float', nullable: false })
  monto_total: number;

  @Column('varchar', { length: 100, nullable: false })
  metodo_de_pago: string;

  @ManyToOne(() => Clientes, (cliente) => cliente.facturas, { eager: true })
  cliente: Clientes;

  @ManyToOne(() => Users, (caja) => caja.facturas, { eager: true })
  caja: Users;

  @OneToMany(() => listan, (listan) => listan.factura, { eager: true })
  public listan: listan[];

  @CreateDateColumn()
  createdAt: Date;

  _name: string = 'Facturas';
}
