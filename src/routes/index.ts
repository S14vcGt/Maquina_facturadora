import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
// *rutas principales, que vienen del loggin
const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("loggin");
});

router.get("/pip", (_req: Request, res:Response) => {
  res.send('hi')
});

router.get("/userAdmin", async(_req: Request, res: Response) => {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
  ;
});

export default router;
