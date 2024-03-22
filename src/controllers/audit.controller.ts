import { audit } from "../models/audit";
import { Users } from "../models/Users";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";
import { UserResponse } from "../dtos/user.dto";

const audited = async (
  entity: any,
  action: string,
  UserId: string | undefined
) => {
  let before = instanceToPlain(entity[0], { excludePrefixes: ["_"] });
  let after = instanceToPlain(entity[1], { excludePrefixes: ["_"] });
  const audited: audit = new audit();
  audited.before = JSON.stringify(before);
  audited.after = JSON.stringify(after);
  audited.action = action;
  audited.table = entity[1]._name;
  let aux2 = await AppDataSource.manager.find(Users, {
    where: { id: UserId },
  });
  audited.user = aux2[0];
  const result = await AppDataSource.manager.save(audited);
  console.log(result);
};

const showAudited = async (_req: Request, res: Response) => {
  const audited = await AppDataSource.getRepository(audit).find();
  const result = audited.map((record) => {
    const record1 = Object.assign(record);
    let aux = instanceToPlain(record.user);
    record1.user = plainToInstance(UserResponse, aux, {
      excludeExtraneousValues: true,
      excludePrefixes: ["_"],
    });
    const { before, after } = record1;
    record1.before = JSON.parse(before);
    record1.after = JSON.parse(after);
    return record1;
  });
  return res.json(result);
};

export { audited, showAudited };
