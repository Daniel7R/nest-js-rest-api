import {
    IsString,
    IsNumber,
    IsUrl,
    IsNotEmpty,
    IsPositive,
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Product name" })
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: "Product description" })
    readonly description: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: "Product price" })
    readonly price: number;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    @ApiProperty({ description: "Product stock" })
    readonly stock: number;

    @IsUrl()
    @IsNotEmpty()
    @ApiProperty({ description: "Product image" })
    readonly image: string;

    @IsPositive()
    @IsNotEmpty()
    @ApiProperty({ description: "Brand id" })
    readonly brandId: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
