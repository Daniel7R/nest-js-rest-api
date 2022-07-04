import { Controller, Get, Param } from "@nestjs/common";

@Controller("categories")
export class CategoriesController {
    @Get("/:id/products/:productId")
    getProduct(
        @Param("id") categoryId: string,
        @Param("productId") productId: string,
    ) {
        return `product ${productId} && ${categoryId}`;
    }
}
