import { Router, Request, Response } from "express";
//import app from "../app"
//import userRouter from "./user";
// *rutas principales, que vienen del loggin
const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("loggin");
});

//app.use("/user", userRouter);

router.get("/userAdmin", (_req:Request, res:Response) => {
  res.send("pagina del admin del usuario");
});

router.get("/superAdmin", (_req:Request, res:Response) => {
  res.send("pagina del superadmin");
});

export default router;