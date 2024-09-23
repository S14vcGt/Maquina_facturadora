import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClientesDto } from './dtos/Createclientes.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get()
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.clientesService.findOne(id);
  }

  @Post()
  create(@Body() createClienteDto: CreateClientesDto) {
    return this.clientesService.create(createClienteDto);
  }
}
