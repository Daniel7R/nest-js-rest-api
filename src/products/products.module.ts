import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Product } from "./entities/products.entity";
import { Category } from "./entities/category.entity";
import { Brand } from "./entities/brand.entity";
import { ProductsController } from "./controllers/products.controller";
import { BrandsController } from "./controllers/brands.controller";
import { CategoriesController } from "./controllers/categories.controller";
import { ProductsService } from "./services/products.service";
import { BrandsService } from "./services/brands.service";
import { CategoriesService } from "./services/categories.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product, Category, Brand])],
    controllers: [ProductsController, CategoriesController, BrandsController],
    providers: [ProductsService, BrandsService, CategoriesService],
    exports: [ProductsService, TypeOrmModule],
})
export class ProductsModule {}
