import { Router } from "express";
import { ClientesController } from "../controllers/clientes.controller";
import { FacturasController } from "../controllers/facturas.controller";

const userRouter = Router();

userRouter.post("/cliente", ClientesController.createCliente);
userRouter.get("/cliente", ClientesController.searchCliente);

userRouter.post("/factura", FacturasController.createFactura);
userRouter.get("/factura", FacturasController.searchFactura);

export default userRouter;
