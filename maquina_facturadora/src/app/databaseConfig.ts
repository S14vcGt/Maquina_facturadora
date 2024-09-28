import { Clientes } from '../clientes/clientes.entity';
import { Factura } from '../facturas/entities/factura.entity';
import { products_list } from '../facturas/entities/products_list.entity';
import { Producto } from '../productos/entities/producto.entity';

export default () => ({
  dbConfig: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: 'postgres',
    password: 'admin',
    database: process.env.DB_NAME,
    entities: [Clientes, Factura, Producto, products_list],
    synchronize: process.env.DB_SYNC,
    autoLoadEntities: process.env.DB_AUTOLOAD,
  },
});
