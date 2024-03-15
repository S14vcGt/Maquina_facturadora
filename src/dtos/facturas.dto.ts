import { Facturas } from "../models/Facturas";
import { ClientesResponse } from "./clientes.dto";
import { listanResponse } from "./listan.dto";
import { listan } from "../models/listan";
import { instanceToPlain, plainToInstance } from "class-transformer";

export class FacturasResponse {
  numero: number;
  monto_total: number;
  metodo_de_pago: string;
  cliente: ClientesResponse;
  caja: number;
  listan: listanResponse[];

  constructor(factura: Facturas) {
    this.numero = factura.numero;
    this.monto_total = factura.monto_total;
    this.metodo_de_pago = factura.metodo_de_pago;
    let aux = instanceToPlain(factura.cliente);
    this.cliente = plainToInstance(ClientesResponse, aux, {
      excludeExtraneousValues: true,
    });
    this.caja = factura.caja.numero;
    this.listan = factura.listan.map((lista: listan) => {
      return new listanResponse(lista);
    });
  }
}
