import { Clientes } from 'src/clientes/clientes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  ManyToOne,
  OneToMany,
  Generated,
} from 'typeorm';
import { products_list } from './products_list.entity';

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

  @Column()
  caja: number;

  @OneToMany(() => products_list, (list) => list.factura, { eager: true })
  public products_list: products_list[];

  @CreateDateColumn()
  fecha: Date;

  _name: string = 'Facturas';
}
