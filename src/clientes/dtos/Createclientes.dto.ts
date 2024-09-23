import { IsDefined, IsString, IsUUID, Length } from 'class-validator';
export class CreateClientesDto {
  @IsDefined()
  @IsUUID()
  id: string;

  @IsDefined()
  @IsString()
  @Length(7, 9)
  cedula: string;

  @IsDefined()
  @IsString()
  nombre: string;

  @IsDefined()
  @IsString()
  apellido: string;

  @IsDefined()
  @IsString()
  direccion: string;

  @IsDefined()
  @IsString()
  @Length(11, 15)
  telefono: string;
}
