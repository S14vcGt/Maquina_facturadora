import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Facturas } from "./Facturas"
@Entity()
export class Cajas {

    @PrimaryGeneratedColumn()
    numero: number

    @Column("varchar", { length: 4 })
    password: string

    @OneToMany(()=>Facturas,(facturas)=> facturas.caja)
    facturas: Facturas[]

}
