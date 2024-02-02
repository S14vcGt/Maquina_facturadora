import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "0311",
    database: "maquina_facturadora",
    synchronize: true,
    logging: true,
    entities: ["src/models/*.ts"],
    migrations: [],
    subscribers: [],
})
