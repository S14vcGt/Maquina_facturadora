import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private productoRepository: Repository<Producto>
  ) {}
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const newProducto = this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(newProducto);
  }

  findAll() {
    return this.productoRepository.find();
  }

  findOne(id: string) {
    return this.checkExistence(id);
  }

  async update(
    id: string,
    updateProductoDto: UpdateProductoDto
  ): Promise<Producto> {
    const existingProducto = await this.checkExistence(id);
    const updatedProducto = this.productoRepository.merge(
      existingProducto,
      updateProductoDto
    );
    return this.productoRepository.save(updatedProducto);
  }

  async remove(id: string): Promise<void> {
    const product = await this.checkExistence(id);
    this.productoRepository.remove(product);
  }

  async checkExistence(id: string): Promise<Producto> {
    const checkProducto = await this.productoRepository.findOneBy({ id });
    if (!checkProducto) {
      throw new NotFoundException(`Product not registered`);
    }
    return checkProducto;
  }
}
