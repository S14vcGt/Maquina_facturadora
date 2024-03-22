import { IsDecimal, IsDefined, IsString, Length } from "class-validator";
import { Expose } from "class-transformer";
export class ProductosResponse {
  @Expose()
  id: string | undefined;
  @Expose()
  @IsDefined()
  @IsString()
  codigo: string;
  @Expose()
  @IsDefined()
  @IsString()
  @Length(5, 20)
  nombre: string;
  @IsDefined()
  @Expose()
  @IsDecimal()
  precio: number;
}
