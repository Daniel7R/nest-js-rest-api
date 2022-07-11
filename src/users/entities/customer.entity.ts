import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 30 })
    name: string;

    @Column({ type: "varchar", length: 40 })
    lastName: string;

    @Column({ type: "varchar", length: 10 })
    phone: string;
}
