import { Router } from "express";
import { ProductosController } from "../controllers/productos.controller";
import { FacturasController } from "../controllers/facturas.controller";
import { ClientesController } from "../controllers/clientes.controller";
import { UsersController } from "../controllers/user.controller";
import { autorizacion } from "../middleware/autorizacion.middleware";
import { showAudited } from "../controllers/audit.controller";

const router = Router();

router.get("/cliente", ClientesController.searchCliente);
router.get("/clientes", ClientesController.loadClientes);
router.put("/clientes/:id", ClientesController.updateCliente);
router.delete("/clientes/:id", ClientesController.deleteCliente);
router.patch("/clientes/:id", ClientesController.restoreCliente);

router.post("/cajas", autorizacion(["superAdmin"]), UsersController.createUser);
router.get("/caja", UsersController.searchCajas);
router.get("/cajas", UsersController.loadUser);
router.put(
  "/cajas/:id",
  autorizacion(["superAdmin"]),
  UsersController.updateUser
);
router.delete(
  "/cajas/:id",
  autorizacion(["superAdmin"]),
  UsersController.deleteUser
);
router.patch("/cajas/:id", UsersController.restoreUser);

router.get("/productos", ProductosController.loadProductos);
router.post("/productos", ProductosController.createProductos);
router.get("/productos/:codigo", ProductosController.searchProducto);
router.put("/productos/:codigo", ProductosController.updateProducto);
router.delete("/productos/:codigo", ProductosController.deleteProducto);
router.patch("/productos/:codigo", ProductosController.restoreProducto);

router.get("/facturas", FacturasController.loadFacturas);
router.get("/facturas/:numero", FacturasController.searchFactura);
router.put(
  "/facturas/:id",
  autorizacion(["superAdmin"]),
  FacturasController.updateFactura
);
router.delete(
  "/facturas/:id",
  autorizacion(["superAdmin"]),
  FacturasController.deleteFactura
);
router.patch(
  "/facturas/:id",
  autorizacion(["superAdmin"]),
  FacturasController.restoreFactura
);

router.get("/users", autorizacion(["superAdmin"]), UsersController.loadUser);
router.post("/users", autorizacion(["superAdmin"]), UsersController.createUser);
router.delete(
  "/users:id",
  autorizacion(["superAdmin"]),
  UsersController.deleteUser
);

router.get("/logs", autorizacion(["superAdmin"]), showAudited);

export default router;
