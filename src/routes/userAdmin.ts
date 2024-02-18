import { CajasController } from "../controllers/cajas.controller";
import { Router, Request, Response } from "express";
import { ProductosController } from "../controllers/productos.controller";
import { FacturasController } from "../controllers/facturas.controller";
import { ClientesController } from "../controllers/clientes.controller";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.send("landing de userAdmin");
});

router.get("/cliente/:cedula", ClientesController.searchCliente);
router.get("/cliente", ClientesController.loadClientes);
router.put("/cliente/:cedula", ClientesController.updateCliente);
router.delete("/cliente/:cedula", ClientesController.deleteCliente);
router.patch("/clientes/:cedula", ClientesController.restoreCliente);

router.post("/cajas", CajasController.createCajas);
router.get("/cajas/:numero", CajasController.searchCajas);
router.get("/cajas", CajasController.loadCajas);
router.put("/cajas/:numero", CajasController.updateCaja);
router.delete("/cajas/:numero", CajasController.deleteCaja);
router.patch("/cajas/:numero", CajasController.restoreCaja);

router.get("/productos", ProductosController.loadProductos);
router.post("/productos", ProductosController.createProductos);
router.get("/productos/:codigo", ProductosController.searchProducto);
router.put("/productos/:codigo", ProductosController.updateProducto);
router.delete("/productos/:codigo", ProductosController.deleteProducto);
router.patch("/productos/:codigo", ProductosController.restoreProducto);

router.get("/facturas", FacturasController.loadFacturas);
router.get("/factura/:numero", FacturasController.searchFactura);
router.put("/facturas/:numero", FacturasController.updateFactura);
router.delete("/facturas/:numero", FacturasController.deleteFactura);
router.patch("/facturas/:numero", FacturasController.restoreFactura);

export default router;
