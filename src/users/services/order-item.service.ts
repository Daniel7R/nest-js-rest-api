import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
    CreateOrderItemDto,
    UpdateOrderItemDto,
} from "../dtos/order-items.dtos";
import { Order } from "../entities/order.entity";
import { OrderItem } from "../entities/order-product.entity";
import { Product } from "../../products/entities/products.entity";

@Injectable()
export class OrderItemService {
    constructor(
        @InjectRepository(Order) private orderRepo: Repository<Order>,
        @InjectRepository(OrderItem) private itemsRepo: Repository<OrderItem>,
        @InjectRepository(Product) private productRepo: Repository<Product>,
    ) {}

    findAll() {
        return this.itemsRepo.find();
    }

    findOne(id: number) {
        return this.itemsRepo.findOne(id, {
            relations: ["order", "product"],
        });
    }

    async create(data: CreateOrderItemDto) {
        const order = await this.orderRepo.findOne(data.orderId);
        const product = await this.productRepo.findOne(data.productId);
        const item = new OrderItem();
        item.order = order;
        item.product = product;
        item.quantity = data.quantity;

        return this.itemsRepo.save(item);
    }

    async update(id: number, changes: UpdateOrderItemDto) {
        const orderItem = await this.itemsRepo.findOne(id);
        if (changes.orderId) {
            const order = await this.orderRepo.findOne(changes.orderId);
            orderItem.order = order;
        }

        if (changes.productId) {
            const product = await this.productRepo.findOne(changes.productId);
            orderItem.product = product;
        }

        if (changes.quantity) {
            orderItem.quantity = changes.quantity;
        }

        return this.itemsRepo.save(orderItem);
    }

    delete(id: number) {
        return this.itemsRepo.delete(id);
    }
}
