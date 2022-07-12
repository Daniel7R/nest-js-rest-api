import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from "@nestjs/common";

import {
    CreateOrderItemDto,
    UpdateOrderItemDto,
} from "../dtos/order-items.dtos";
import { OrderItemService } from "../services/order-item.service";

@Controller("orders-item")
export class OrdersItemController {
    constructor(private itemsService: OrderItemService) {}

    @Get()
    findAll() {
        return this.itemsService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.itemsService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateOrderItemDto) {
        return this.itemsService.create(payload);
    }

    @Put(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() payload: UpdateOrderItemDto,
    ) {
        return this.itemsService.update(id, payload);
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.itemsService.delete(id);
    }
}
