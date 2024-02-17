import { Router, Request, Response } from "express";
import { ClientesController } from "../controllers/clientes.controller";
import { FacturasController } from "../controllers/facturas.controller";
//* rutas principales, que vienen del loggin
const userRouter = Router();

userRouter.get("/", (_req: Request, res: Response) => {
  res.send("pagina de usuario completa");
}); //?sera que uso el all y hago todo ahi directamente?

userRouter.post("/cliente", ClientesController.createCliente);
userRouter.get("/cliente/:cedula",ClientesController.searchCliente)
userRouter.get("/cliente",ClientesController.loadClientes)
userRouter.put("/cliente/:cedula", ClientesController.updateCliente)
userRouter.delete("/cliente/:cedula",ClientesController.deleteCliente)

userRouter.post("/factura",FacturasController.createFactura);
userRouter.get("/factura",FacturasController.loadFacturas)

export default userRouter;
