import app from "./app";
/*import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/api", (_req:Request, res:Response)=>{
  res.send('por favor')
})*/
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});