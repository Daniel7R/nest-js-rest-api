import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    OneToMany,
} from "typeorm";
import { Order } from "./order.entity";

import { User } from "./user.entity";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 30 })
    name: string;

    @Column({ type: "varchar", length: 40 })
    lastName: string;

    @Column({ type: "varchar", length: 20 })
    phone: string;

    @CreateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    })
    createAt: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;

    @OneToOne(() => User, (user) => user.customer, { nullable: true })
    user: User;

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];
}
