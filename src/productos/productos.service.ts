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
    private productoRepository: Repository<Producto>,
  ) {}
  async create(createProductoDto: CreateProductoDto): Promise<Producto> {
    const newProducto = this.productoRepository.create(createProductoDto);
    return this.productoRepository.save(newProducto);
  }

  findAll() {
    return `This action returns all productos`;
  }

  findOne(id: string) {
      return this.checkExistence(id)
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }

  async checkExistence(id: string): Promise<Producto> {
    const checkProducto = await this.productoRepository.findOneBy({ id });
    if (!checkProducto) {
      throw new NotFoundException(`Producto no registrado`);
    }
    return checkProducto;
  }
}
