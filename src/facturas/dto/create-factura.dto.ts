import {
  IsDecimal,
  IsDefined,
  IsIn,
  IsNumberString,
  IsUUID,
} from 'class-validator';
import { CreateClientesDto } from 'src/clientes/dtos/Createclientes.dto';
import { medotosDePago } from '../const/metodosDePago';
import { productsListDto } from './products_list.dto';
export class CreateFacturaDto {
  @IsUUID()
  id: string;
  @IsNumberString()
  numero: number;
  @IsDecimal()
  monto_total: number;
  @IsIn(medotosDePago)
  metodo_de_pago: string;
  @IsDefined()
  cliente: CreateClientesDto;
  @IsNumberString()
  caja: number;
  @IsDefined()
  products_list: productsListDto[];
}
