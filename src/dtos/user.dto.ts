import { Expose } from "class-transformer";
import { IsBoolean, IsDefined, IsString, Length } from "class-validator";

export class UserResponse {
  @Expose()
  id: string | undefined;

  @Expose()
  numero: number | undefined;

  @Expose()
  @IsDefined()
  @IsString()
  @Length(8, 12)
  _password: string;

  @Expose()
  @IsDefined()
  @IsBoolean()
  esCaja: boolean;

  @Expose()
  @IsDefined()
  @IsBoolean()
  admin: boolean;

  @Expose()
  @IsDefined()
  @IsBoolean()
  superAdmin: boolean;
}
