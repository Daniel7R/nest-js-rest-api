import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";

import { Product } from "./products.entity";

@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, unique: true })
    name: string;

    @Column({ type: "varchar", length: 255 })
    image: string;

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

    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];
}
