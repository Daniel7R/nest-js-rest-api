import {
    Controller,
    Get,
    Post,
    Param,
    Query,
    Body,
    Put,
    Delete,
    HttpStatus,
    HttpCode,
    ParseIntPipe
} from "@nestjs/common";
import { ProductsService } from "src/services/products.service";
import { Response } from "express";

@Controller("products")
export class ProductsController {
    constructor(private productsService: ProductsService) { }
    @Get("")
    home() {
        return this.productsService.findAll();
    }

    @Get("/filter")
    filter() {
        return `Es el product filter`;
    }

    @Get(":id")
    @HttpCode(HttpStatus.ACCEPTED)
    getOne(@Param("id", ParseIntPipe) productId: number) {
        return this.productsService.findOne(productId);
    }

    @Get("/")
    getMany(@Query() params: any) {
        const { limit, offset } = params;
        return `products limit ==>  ${limit} offset ==> ${offset}`;
    }

    @Post()
    create(@Body() payload: any) {
        return this.productsService.create(payload);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: any) {
        return this.productsService.update(+id, payload);
    }

    @Delete("/:id")
    delete(@Param("id") id: string) {
        return this.productsService.delete(+id);
    }
}
