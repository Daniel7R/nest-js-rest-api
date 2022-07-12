import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { User } from "./entities/user.entity";
import { Customer } from "./entities/customer.entity";
import { OrderItem } from "./entities/order-product.entity";
import { Order } from "./entities/order.entity";
import { CustomerController } from "./controllers/customers.controller";
import { CustomersService } from "./services/customers.service";
import { UsersController } from "./controllers/users.controller";
import { UsersService } from "./services/users.service";
import { ProductsModule } from "../products/products.module";
import { OrdersService } from "./services/orders.service";
import { OrdersController } from "./controllers/orders.controller";
import { OrdersItemController } from "./controllers/orders-item.controller";
import { OrderItemService } from "./services/order-item.service";

@Module({
    imports: [
        ProductsModule,
        TypeOrmModule.forFeature([User, Customer, Order, OrderItem]),
    ],
    controllers: [
        CustomerController,
        UsersController,
        OrdersController,
        OrdersItemController,
    ],
    providers: [
        CustomersService,
        UsersService,
        OrdersService,
        OrderItemService,
    ],
})
export class UsersModule {}
