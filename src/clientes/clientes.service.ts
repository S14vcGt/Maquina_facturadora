import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Clientes } from './clientes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientesDto } from './dtos/Createclientes.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Clientes)
    private clientesRepository: Repository<Clientes>,
  ) {}

  findOne(id: string): Promise<Clientes> {
    return this.checkExistence(id);
  }

  create(cliente: CreateClientesDto): Promise<Clientes> {
    const newCliente = this.clientesRepository.create(cliente);
    return this.clientesRepository.save(newCliente);
  }

  async checkExistence(id: string): Promise<Clientes> {
    const checkCliente = await this.clientesRepository.findOneBy({ id });
    if (!checkCliente) {
      throw new NotFoundException(`Cliente no registrado`);
    }
    return checkCliente;
  }
}
