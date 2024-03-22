import app from "./app";
import * as dotenv from "dotenv";
import { AppDataSource } from "./data-source";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("TypeORM initialized and ready");
  })
  .catch((error) => console.log("datasource: " + error));

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
