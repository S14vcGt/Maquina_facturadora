import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Factura } from '../facturas/entities/factura.entity';

@Entity()
export class Clientes {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  cedula: string;

  @Column('varchar', { nullable: false })
  nombre: string;

  @Column('varchar', { nullable: false })
  apellido: string;

  @Column('varchar', { nullable: false })
  direccion: string;

  @Column('varchar', { nullable: false })
  telefono: string;

  @OneToMany(() => Factura, (factura) => factura.cliente, {
    onUpdate: 'CASCADE',
  })
  facturas: Factura[];
}
