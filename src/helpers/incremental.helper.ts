import { AppDataSource } from "../data-source";
import { UserResponse } from "../dtos/user.dto";
import { Users } from "../models/Users";
export const incremental = async (
  user: UserResponse
): Promise<UserResponse> => {
  let nuevoNumero = 0;
  if (user.esCaja) {
    const maxNumero = await AppDataSource.getRepository(Users)
      .createQueryBuilder("users")
      .where("users.esCaja = true")
      .select("MAX(users.numero)", "max_numero")
      .getRawOne();

    nuevoNumero = maxNumero.max_numero ? maxNumero.max_numero + 1 : 1;
  } else {
    if (user.superAdmin || user.admin) {
      const maxNumero = await AppDataSource.getRepository(Users)
        .createQueryBuilder("users")
        .where("users.esCaja = false")
        .select("MAX(users.numero)", "max_numero")
        .getRawOne();

      nuevoNumero = maxNumero.max_numero ? maxNumero.max_numero + 1 : 1;
    } else {
      throw new Error("Operacion de incremento manual fallida");
    }
  }
  user.numero = nuevoNumero;
  return user;
};
