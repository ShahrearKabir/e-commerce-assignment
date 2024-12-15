import { IsEnum, IsString } from 'class-validator';

export class UpdateOrderDto {
    @IsString()
    @IsEnum(['Pending', 'Shipped', 'Delivered', 'Cancelled'])
    status: string;
}