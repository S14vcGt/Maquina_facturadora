import { Clientes } from '../clientes/clientes.entity';
import { CreateClientesDto } from '../clientes/dtos/Createclientes.dto';
import { TESTING_ADDRESS_1, TESTING_PHONE_NUMBER_1 } from './const';

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
