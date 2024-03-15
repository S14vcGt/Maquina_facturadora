import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/index";
import cajaRouter from "./routes/caja";
import adminRouter from "./routes/admin";
import { errorHandler } from "./middleware/error.middleware";
import { authenticate } from "./middleware/autenticacion.middleware";
import cookieParser from "cookie-parser";
import { autorizacion } from "./middleware/autorizacion.middleware";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
interface UserBasicInfo {
  _id: string;
  numero: number;
  rol: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: UserBasicInfo | null;
    }
  }
}
app.use("/", indexRoutes);
app.use("/user", authenticate, autorizacion(["caja"]), cajaRouter);
app.use(
  "/userAdmin",
  authenticate,
  autorizacion(["superAdmin", "admin"]),
  adminRouter
);

app.use(errorHandler);
export default app;
