import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToOne,
    JoinColumn,
} from "typeorm";

import { Customer } from "./customer.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    email: string;

    @Column({ type: "varchar", length: 255 })
    password: string; //encrypt

    @Column({ type: "varchar", length: 20 })
    role: string;

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

    @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
    @JoinColumn()
    customer: Customer;
}
