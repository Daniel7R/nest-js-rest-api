import {
    IsString,
    IsNotEmpty,
    IsEmail,
    Length,
    IsPositive,
    IsOptional,
} from "class-validator";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    @ApiProperty({ description: "Users email" })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Length(6)
    @ApiProperty({ description: "Users password" })
    readonly password: string;

    @IsNotEmpty()
    @ApiProperty({ description: "Users role" })
    readonly role: string;

    @IsOptional()
    @IsPositive()
    @ApiProperty({ description: "Customer id" })
    readonly customerId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
