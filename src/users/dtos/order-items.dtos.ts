import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive } from "class-validator";

export class CreateOrderItemDto {
    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: "Customer id" })
    readonly orderId: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: "Customer id" })
    readonly productId: number;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: "Customer id" })
    readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
