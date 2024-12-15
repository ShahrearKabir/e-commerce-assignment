import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Get()
    findAll(@Query() query: any) {
        return this.categoriesService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(id);
    }

    @Post()
    create(@Body() data: CreateCategoryDto) {
        return this.categoriesService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateCategoryDto) {
        return this.categoriesService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}
