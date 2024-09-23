import { Clientes } from 'src/clientes/clientes.entity';
import { Factura } from 'src/facturas/entities/factura.entity';
import { Producto } from 'src/productos/entities/producto.entity';

export default () => ({
  dbConfig: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Clientes, Factura, Producto],
    synchronize: process.env.DB_SYNC,
    autoLoadEntities: process.env.DB_AUTOLOAD,
  },
});
