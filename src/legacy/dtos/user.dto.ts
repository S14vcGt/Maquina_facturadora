import { Expose } from "class-transformer";
import { IsDefined, IsIn, IsString, Length } from "class-validator";

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
  @IsString()
  @IsIn(["caja", "admin", "superadmin"])
  rol: string;
}
