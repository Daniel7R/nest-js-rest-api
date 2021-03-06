import {
    PrimaryGeneratedColumn,
    Entity,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Exclude, Expose } from "class-transformer";

import { Customer } from "./customer.entity";
import { OrderItem } from "./order-product.entity";

@Entity({ name: "orders" })
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
        name: "create_at",
    })
    createAt: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        default: () => "CURRENT_TIMESTAMP",
        name: "updated_at",
    })
    updatedAt: Date;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @Exclude()
    @OneToMany(() => OrderItem, (item) => item.order)
    items: OrderItem[];

    @Expose()
    get products() {
        if (this.items) {
            return this.items
                .filter((item) => !!item)
                .map((item) => ({
                    ...item.product,
                    quantity: item.quantity,
                    itemId: item.id,
                }));
        }
        return [];
    }

    @Expose()
    get total() {
        if (this.items) {
            return this.items
                .filter((item) => !!item)
                .reduce((total, item) => {
                    const totalItem = item.product.price * item.quantity;
                    return total + totalItem;
                }, 0);
        }
        return 0;
    }
}
