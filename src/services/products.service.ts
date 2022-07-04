import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "../entities/products.entity";
import { CreateProductDto, UpdateProductDto } from "src/dtos/products.dtos";

@Injectable()
export class ProductsService {
    private counterId = 0;
    private products: Product[] = [
        {
            id: 0,
            name: "Producto 1",
            description: "Bla bla bla bla",
            price: 12000,
            stock: 12,
            image: "",
        },
    ];

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        const product = this.products.find((item) => item.id === id);
        if (!product) {
            throw new NotFoundException(`El producto con id ${id} no existe`);
        }

        return product;
    }

    create(payload: CreateProductDto) {
        this.counterId = this.counterId + 1;
        const newProduct = {
            id: this.counterId,
            ...payload,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    update(id: number, payload: UpdateProductDto) {
        const product = this.findOne(id);
        if (product) {
            const index = this.products.findIndex((item) => item.id === id);
            this.products[index] = {
                ...product,
                ...payload,
            };
            return this.products[index];
        }
        return product;
    }

    delete(id: number) {
        const index = this.products.findIndex((item) => item.id === id);
        if (index === -1) {
            return new NotFoundException("No encontrado");
        }
        this.products.splice(index, 1);

        return true;
    }
}
