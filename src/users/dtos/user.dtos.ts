import { IsString, IsNotEmpty, IsEmail, Length } from "class-validator";
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
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
