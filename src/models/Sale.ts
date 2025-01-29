import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, Relation, Index, JoinColumn } from "typeorm"
import { User } from "./User"

@Entity("sales")
export class Sale {
    @PrimaryGeneratedColumn("increment")
    id: number

    @Index()
    @Column("text")
    product: string

    @Column("integer")
    amount: number

    @Column("money")
    price: number

    @ManyToOne(() => User, (user) => user.sales)
    @JoinColumn({ name: 'userid' })
    user: User

    // @ManyToOne("User", (user: User) => user.sales)
    // user: User
}

