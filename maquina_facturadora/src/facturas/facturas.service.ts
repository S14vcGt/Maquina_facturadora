import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FacturasService {
  constructor(
    @InjectRepository(Factura)
    private facturaRepository: Repository<Factura>
  ) {}

  async create(createFacturaDto: CreateFacturaDto) {
    const newFactura = this.facturaRepository.create(createFacturaDto);
    return this.facturaRepository.save(newFactura);
  }

  findAll() {
    return this.facturaRepository.find();
  }

  findOne(id: string) {
    return this.checkExistence(id)
  }

  async checkExistence(id: string): Promise<Factura> {
    const checkFactura = await this.facturaRepository.findOneBy({ id });
    if (!checkFactura) {
      throw new NotFoundException(`Factura no registrada`);
    }
    return checkFactura;
  }
}
