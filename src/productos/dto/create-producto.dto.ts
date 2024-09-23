import {
  IsDecimal,
  IsDefined,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateProductoDto {
  @IsDefined()
  @IsUUID()
  id: string;
  @IsDefined()
  @IsString()
  codigo: string;
  @IsDefined()
  @IsString()
  @Length(5, 20)
  nombre: string;
  @IsDefined()
  @IsDecimal()
  precio: number;
}
