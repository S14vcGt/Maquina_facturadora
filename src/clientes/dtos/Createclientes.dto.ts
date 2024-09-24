import { IsString, IsUUID, Length } from 'class-validator';
export class CreateClientesDto {
  @IsUUID()
  id: string;

  @IsString()
  @Length(7, 9)
  cedula: string;

  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsString()
  direccion: string;

  @IsString()
  @Length(11, 15)
  telefono: string;
}
