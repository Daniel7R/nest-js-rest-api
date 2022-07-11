import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// import { BrandsService } from "./brands.service";
import { Product } from "../entities/products.entity";
import { Category } from "../entities/category.entity";
import { Brand } from "../entities/brand.entity";

import { CreateProductDto, UpdateProductDto } from "../dtos/products.dtos";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
        @InjectRepository(Category) private categoryRepo: Repository<Category>,
        @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    ) {}

    findAll() {
        return this.productRepo.find({
            relations: ["brand"],
        });
    }

    async findOne(id: number) {
        const product = await this.productRepo.findOne({
            relations: ["brand", "categories"],
            where: {
                id,
            },
        });
        if (!product) {
            throw new NotFoundException(`El producto con id ${id} no existe`);
        }
        return product;
    }

    async create(payload: CreateProductDto) {
        // const newProduct = new Product();
        // newProduct.name = payload.name;
        // newProduct.description = payload.description;
        // newProduct.price = payload.price;
        // newProduct.stock = payload.stock;
        // newProduct.image = payload.image;

        // this.productRepo.save(newProduct);
        const newProduct = this.productRepo.create(payload);
        if (payload.brandId) {
            const brand = await this.brandRepo.findOne(payload.brandId);
            newProduct.brand = brand;
        }

        if (payload.categoriesIds) {
            const categories = await this.categoryRepo.findByIds(
                payload.categoriesIds,
            );
            newProduct.categories = categories;
        }

        return this.productRepo.save(newProduct);
    }

    async update(id: number, changes: UpdateProductDto) {
        const product = await this.productRepo.findOne({ id: id });
        if (changes.brandId) {
            const brand = await this.brandRepo.findOne(changes.brandId);
            product.brand = brand;
        }

        if (changes.categoriesIds) {
            const categories = await this.categoryRepo.findByIds(
                changes.categoriesIds,
            );
            product.categories = categories;
        }
        this.productRepo.merge(product, changes);

        return this.productRepo.save(product);
    }

    async removeCategoryByProduct(productId: number, categoryId: number) {
        const product = await this.productRepo.findOne(productId, {
            relations: ["categories"],
        });
        product.categories = product.categories.filter(
            (item) => item.id !== categoryId,
        );

        return this.productRepo.save(product);
    }

    async addCategoryToProduct(productId: number, categoryId: number) {
        const product = await this.productRepo.findOne(productId, {
            relations: ["categories"],
        });
        const category = await this.categoryRepo.findOne(categoryId);

        product.categories.push(category);
        return this.productRepo.save(product);
    }

    delete(id: number) {
        return this.productRepo.delete(id);
    }
}
