import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
//import { listan } from './listan';
@Entity()
export class Producto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  codigo: string;

  @Column({ type: 'float', nullable: false })
  precio: number;

  @Column('varchar', { nullable: false })
  nombre: string;

  @OneToMany(() => listan, (listan) => listan.producto, { onUpdate: 'CASCADE' })
  public listan: listan[];

  _name: string = 'Productos';
}