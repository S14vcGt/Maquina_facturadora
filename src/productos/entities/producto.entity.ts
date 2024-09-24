import { products_list } from 'src/facturas/entities/products_list.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @OneToMany(() => products_list, (list) => list.producto, {
    onUpdate: 'CASCADE',
  })
  public products_list: products_list[];

  _name: string = 'Productos';
}
