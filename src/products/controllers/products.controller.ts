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
    // ParseIntPipe
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

import { ProductsService } from "../services/products.service";
// import { Response } from "express";
import { ParseIntPipe } from "../../common/parse-int.pipe";
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dtos";

@ApiTags("Products")
@Controller("products")
export class ProductsController {
    constructor(private productsService: ProductsService) {}
    @Get("")
    @ApiOperation({ summary: "Products list" })
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
    create(@Body() payload: CreateProductDto) {
        return this.productsService.create(payload);
    }

    @Put(":id")
    update(@Param("id") id: number, @Body() payload: UpdateProductDto) {
        return this.productsService.update(id, payload);
    }

    @Delete("/:id")
    delete(@Param("id") id: number) {
        return this.productsService.delete(id);
    }
}
