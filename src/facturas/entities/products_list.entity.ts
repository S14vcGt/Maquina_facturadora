import { ManyToOne, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Factura } from './factura.entity';
import { Producto } from 'src/productos/entities/producto.entity';

@Entity()
export class products_list {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => Factura, (factura) => factura.products_list)
  public factura: Factura;

  @ManyToOne(() => Producto, (producto) => producto.products_list, {
    eager: true,
  })
  public producto: Producto;

  _name: string = 'products_list';
}
