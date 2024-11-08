import { Clientes } from '../clientes/clientes.entity';
import { CreateClientesDto } from '../clientes/dtos/Createclientes.dto';
import { medotosDePago } from '../facturas/const/metodosDePago';
import { CreateFacturaDto } from '../facturas/dto/create-factura.dto';
import { productsListDto } from '../facturas/dto/products_list.dto';
import { Factura } from '../facturas/entities/factura.entity';
import { products_list } from '../facturas/entities/products_list.entity';
import { CreateProductoDto } from '../productos/dto/create-producto.dto';
import { UpdateProductoDto } from '../productos/dto/update-producto.dto';
import { Producto } from '../productos/entities/producto.entity';
import {
  TESTING_ADDRESS_1,
  testing_barcode_1,
  TESTING_PHONE_NUMBER_1,
  TestingUUID09,
  TestingUUID2,
} from './const';

export const CreateClientesDtoTest1: CreateClientesDto = {
  id: 'e041dac8-548f-4db0-9fc6-c6b92ce853f3',
  cedula: '30547598',
  nombre: 'Sebastian',
  apellido: 'Mata',
  direccion: TESTING_ADDRESS_1,
  telefono: TESTING_PHONE_NUMBER_1,
};

export const ClientesTest1: Clientes = {
  id: 'e041dac8-548f-4db0-9fc6-c6b92ce853f3',
  cedula: '30547598',
  nombre: 'Sebastian',
  apellido: 'Mata',
  direccion: TESTING_ADDRESS_1,
  telefono: TESTING_PHONE_NUMBER_1,
  facturas: [],
};

export const CreateProductoDtoTesting_1: CreateProductoDto = {
  id: TestingUUID2,
  codigo: testing_barcode_1,
  precio: 1546,
  nombre: 'Papel Higienico Jhonnsons',
};

export const UpdateProductoDtoTesting_1: UpdateProductoDto = {
  codigo: testing_barcode_1,
  precio: 3.7,
  nombre: 'Papel Higienico Jhonnsons',
};

export const ProductoTest_1: Producto = {
  id: TestingUUID2,
  codigo: testing_barcode_1,
  precio: 1546,
  nombre: 'Papel Higienico Jhonnsons',
  products_list: [],
};

export const product_listDtoTesting_1: productsListDto = {
  cantidad: 2,
  producto: UpdateProductoDtoTesting_1,
};


export const CreateFacturaDtoTest_1: CreateFacturaDto = {
  id: TestingUUID09,
  numero: 1,
  monto_total: 56.4,
  metodo_de_pago: medotosDePago[0],
  cliente: CreateClientesDtoTest1,
  caja: 1,
  products_list: [product_listDtoTesting_1],
};

export const product_listTestin_1:products_list ={
  id: 1,
  cantidad:2,
  producto: ProductoTest_1,
  factura:null
}

export const FacturaTest_1: Factura= {
  id: TestingUUID09,
  numero: 1,
  monto_total: 56.4,
  metodo_de_pago: medotosDePago[0],
  cliente: ClientesTest1,
  caja: 1,
  fecha: new Date(),
  products_list: [product_listTestin_1]
}