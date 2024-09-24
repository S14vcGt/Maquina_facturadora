import { IsDecimal, IsString, IsUUID, Length } from 'class-validator';

export class CreateProductoDto {
  @IsUUID()
  id: string;
  @IsString()
  codigo: string;
  @IsString()
  @Length(5, 20)
  nombre: string;
  @IsDecimal()
  precio: number;
}
