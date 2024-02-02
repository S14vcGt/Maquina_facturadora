import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User } from "../models/User";
//import userRouter from "./user";
// *rutas principales, que vienen del loggin
const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("loggin");
});

//app.use("/user", userRouter);

router.get("/userAdmin", async(_req: Request, res: Response) => {
    const users = await AppDataSource.getRepository(User).find();
    res.json(users);
  ;
});

router.get("/superAdmin", (_req: Request, res: Response) => {
  res.send("pagina del superadmin");
});

export default router;
