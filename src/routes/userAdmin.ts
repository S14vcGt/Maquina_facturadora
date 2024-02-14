//todo eliminar facturas
//todo listar facturas
//todo modificar facturas
//todo desactivar cajas
//todo agregar productos
//TODO eliminar productos
//todo modificar productos
//todo listar productos
//todo listar cajas
//todo crear cajas
//todo modificar las contrasenas de las cajas
//todo eliminar clientes
//todo modificar clientes
//todo listar clientes
import { CajasController } from "../controllers/cajas.controller";
import { Router, Request, Response } from "express";
import { ProductosController } from "../controllers/productos.controller";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("landing de userAdmin");
});

router.post("/cajas", CajasController.createCajas);
router.get("/cajas/:numero", CajasController.searchCajas);
router.get("/cajas", CajasController.loadCajas);
router.put("/cajas/:numero", CajasController.updateCaja);
router.delete("/cajas/:numero", CajasController.deleteCaja);

router.get("/productos", ProductosController.loadProductos);
router.post("/productos", ProductosController.createProductos);
router.get("/productos/:codigo", ProductosController.searchProducto);
router.put("/productos/:codigo", ProductosController.updateProducto);
router.delete("/productos/:codigo", ProductosController.deleteProducto);

export default router;
