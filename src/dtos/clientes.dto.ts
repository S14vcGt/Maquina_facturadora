import { Clientes } from "../models/Clientes";

export class ClientesResponse{
    cedula:number;
    nombre:string;
    apellido:string;
    direccion:string;
    telefono:string;

    constructor(cliente:Clientes){
        this.cedula= cliente.cedula
        this.nombre= cliente.nombre
        this.apellido=cliente.apellido
        this.direccion= cliente.direccion
        this.telefono= cliente.telefono
    }
}