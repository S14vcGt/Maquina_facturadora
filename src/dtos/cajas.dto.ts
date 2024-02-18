import { Cajas } from "../models/Cajas";

export class CajasResponse {
  numero: number;
  password: string;

  constructor(caja: Cajas, pass: string = " ") {
    this.numero = caja.numero;
    this.password = pass;
  }
}
