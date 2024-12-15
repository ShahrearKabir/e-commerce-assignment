import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly currentService: OrdersService) { }

    @Get()
    findAll(@Query() query: any) {
        return this.currentService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.currentService.findOne(id);
    }

    @Post()
    create(@Body() data: CreateOrderDto) {
        return this.currentService.create(data);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: UpdateOrderDto) {
        return this.currentService.update(id, data);
    }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return this.currentService.remove(id);
    // }
}
