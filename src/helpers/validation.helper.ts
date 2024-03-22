import { UserResponse } from "../dtos/user.dto";

export const Xor = (user: UserResponse) => {
  const gate = (rol1: boolean, rol2: boolean, rol3: boolean) => {
    return rol1 && !rol2 && !rol3;
  };

  const result =
    gate(user.esCaja, user.admin, user.superAdmin) ||
    gate(user.admin, user.esCaja, user.superAdmin) ||
    gate(user.superAdmin, user.admin, user.esCaja);

  if (!result) {
    throw new Error("You can only have one rol at a time");
  }
};
