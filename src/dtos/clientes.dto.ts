import { Expose } from "class-transformer";
import { IsDefined, IsString, Length } from "class-validator";
export class ClientesResponse {
  @Expose()
  @IsDefined()
  @IsString()
  @Length(8, 9)
  cedula: number;
  @Expose()
  @IsDefined()
  @IsString()
  nombre: string;
  @Expose()
  @IsDefined()
  @IsString()
  apellido: string;
  @Expose()
  @IsDefined()
  @IsString()
  direccion: string;
  @Expose()
  @IsDefined()
  @IsString()
  @Length(11, 15)
  telefono: string;
}
