import {
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
} from "typeorm";
import { Exclude } from "class-transformer";

import { Product } from "../../products/entities/products.entity";
import { Order } from "./order.entity";

@Entity({ name: "orders_items" })
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Exclude()
    @CreateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
        name: "create_at",
    })
    createAt: Date;

    @Exclude()
    @UpdateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
        name: "updated_at",
    })
    updatedAt: Date;

    @Column({ type: "int" })
    quantity: number;

    @ManyToOne(() => Product)
    product: Product;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;
}
