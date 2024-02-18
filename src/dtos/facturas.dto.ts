import { Facturas } from "../models/Facturas";
import { ClientesResponse } from "./clientes.dto";
import { CajasResponse } from "./cajas.dto";
import { listanResponse } from "./listan.dto";
import { listan } from "../models/listan";

export class FacturasResponse {
  numero: number;
  monto_total: number;
  metodo_de_pago: string;
  cliente: ClientesResponse;
  caja: CajasResponse;
  listan: listanResponse[];

  constructor(factura: Facturas) {
    this.numero = factura.numero;
    this.monto_total = factura.monto_total;
    this.metodo_de_pago = factura.metodo_de_pago;
    this.cliente = new ClientesResponse(factura.cliente);
    this.caja = new CajasResponse(factura.caja);
    this.listan = factura.listan.map((lista: listan) => {
      return new listanResponse(lista);
    });
  }
}
