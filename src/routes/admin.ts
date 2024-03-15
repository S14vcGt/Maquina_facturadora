import { Router } from "express";
import { ProductosController } from "../controllers/productos.controller";
import { FacturasController } from "../controllers/facturas.controller";
import { ClientesController } from "../controllers/clientes.controller";
import { UsersController } from "../controllers/user.controller";
import { autorizacion } from "../middleware/autorizacion.middleware";

const router = Router();

router.get("/clientes/:cedula", ClientesController.searchCliente);
router.get("/clientes", ClientesController.loadClientes);
router.put("/clientes/:cedula", ClientesController.updateCliente);
router.delete("/clientes/:cedula", ClientesController.deleteCliente);
router.patch("/clientes/:cedula", ClientesController.restoreCliente);

router.post("/cajas", autorizacion(["superAdmin"]), UsersController.createUser);
router.get("/cajas/:numero", UsersController.searchCajas);
router.get("/cajas", UsersController.loadUser);
router.put(
  "/cajas/:numero",
  autorizacion(["superAdmin"]),
  UsersController.updateUser
);
router.delete(
  "/cajas/:numero",
  autorizacion(["superAdmin"]),
  UsersController.deleteUser
);
router.patch("/cajas/:numero", UsersController.restoreUser);

router.get("/productos", ProductosController.loadProductos);
router.post("/productos", ProductosController.createProductos);
router.get("/productos/:codigo", ProductosController.searchProducto);
router.put("/productos/:codigo", ProductosController.updateProducto);
router.delete("/productos/:codigo", ProductosController.deleteProducto);
router.patch("/productos/:codigo", ProductosController.restoreProducto);

router.get("/facturas", FacturasController.loadFacturas);
router.get("/facturas/:numero", FacturasController.searchFactura);
router.put(
  "/facturas/:numero",
  autorizacion(["superAdmin"]),
  FacturasController.updateFactura
);
router.delete(
  "/facturas/:numero",
  autorizacion(["superAdmin"]),
  FacturasController.deleteFactura
);
router.patch(
  "/facturas/:numero",
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

export default router;
