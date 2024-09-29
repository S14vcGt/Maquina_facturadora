import { PartialType } from '@nestjs/mapped-types';
import { CreateClientesDto } from './Createclientes.dto';

export class UpdateFacturaDto extends PartialType(CreateClientesDto) {}
