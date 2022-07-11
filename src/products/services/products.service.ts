import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Product } from "../entities/products.entity";
import { CreateProductDto, UpdateProductDto } from "../dtos/products.dtos";

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRepo: Repository<Product>,
    ) {}

    findAll() {
        return this.productRepo.find();
    }

    async findOne(id: number) {
        const product = await this.productRepo.findOne({ id: id });
        if (!product) {
            throw new NotFoundException(`El producto con id ${id} no existe`);
        }
        return product;
    }

    create(payload: CreateProductDto) {
        // const newProduct = new Product();
        // newProduct.name = payload.name;
        // newProduct.description = payload.description;
        // newProduct.price = payload.price;
        // newProduct.stock = payload.stock;
        // newProduct.image = payload.image;

        // this.productRepo.save(newProduct);
        const newProduct = this.productRepo.create(payload);

        return this.productRepo.save(newProduct);
    }

    async update(id: number, changes: UpdateProductDto) {
        const product = await this.productRepo.findOne({ id: id });
        this.productRepo.merge(product, changes);

        return this.productRepo.save(product);
    }

    delete(id: number) {
        return this.productRepo.delete(id);
    }
}
