import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    ParseIntPipe,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { BrandsService } from "../services/brands.service";
import { CreateBrandDto, UpdateBrandDto } from "../dtos/brand.dtos";

@ApiTags("Brands")
@Controller("brands")
export class BrandsController {
    constructor(private brandService: BrandsService) {}

    @Get()
    findAll() {
        return this.brandService.findAll();
    }

    @Get(":id")
    findOne(@Param("id", ParseIntPipe) id: number) {
        return this.brandService.findOne(id);
    }

    @Post()
    create(@Body() payload: CreateBrandDto) {
        return this.brandService.create(payload);
    }

    @Put(":id")
    update(
        @Param("id", ParseIntPipe) id: number,
        @Body() payload: UpdateBrandDto,
    ) {
        return this.brandService.update(id, payload);
    }

    @Delete(":id")
    remove(@Param("id", ParseIntPipe) id: number) {
        return this.brandService.remove(+id);
    }
}
