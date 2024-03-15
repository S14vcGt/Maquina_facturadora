import { Expose } from "class-transformer";
import { IsBoolean, IsDefined, IsInt, IsString, Length } from "class-validator";

export class UserResponse {
  @Expose()
  id: string | undefined;

  @Expose()
  @IsDefined()
  @IsInt()
  numero: number;

  @Expose()
  @IsDefined()
  @IsString()
  @Length(8, 12)
  _password: string;

  @Expose()
  @IsDefined()
  @IsBoolean()
  caja: boolean;

  @Expose()
  @IsDefined()
  @IsBoolean()
  admin: boolean;

  @Expose()
  @IsDefined()
  @IsBoolean()
  superAdmin: boolean;
}
