import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/index";
import userRouter from "./routes/user";
import userAdminRouter from "./routes/userAdmin";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRoutes);
app.use("/user", userRouter);
app.use("/userAdmin", userAdminRouter);

export default app;
