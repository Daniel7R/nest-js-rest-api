import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50 })
    email: string;

    @Column({ type: "varchar", length: 30 })
    password: string;

    @Column({ type: "varchar", length: 20 })
    role: string;
}
