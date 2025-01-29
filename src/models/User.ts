import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Relation, Index } from "typeorm"
import { Sale } from "./Sale"


@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Index()
    @Column("text")
    name: string

    @Column("text")
    passwordHash: string

    @Column("text")
    email: string

    @Column("integer")
    age: number

    @Column("integer", {nullable: true })
    salary: number

    @OneToMany(() => Sale, (sale: Sale) => sale.user)
    sales: Sale[]

    // @OneToMany("Sale", (sale: Sale) => sale.user)
    // sales: Sale[]
}

