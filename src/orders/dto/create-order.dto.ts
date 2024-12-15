import {
    IsArray,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    ValidateNested,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class ProductQuantityDto {
    @IsString()
    @IsNotEmpty()
    productId: string;
  
    @IsNumber()
    @IsPositive()
    quantity: number;
  }
  
  export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    customerName: string;
  
    @IsEmail()
    customerEmail: string;
  
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductQuantityDto)
    products: ProductQuantityDto[];
  
    // @IsNumber()
    // @IsPositive()
    // totalPrice: number;

    // @IsString()
    // @IsEnum(['Pending', 'Shipped', 'Delivered', 'Cancelled'])
    // status: string;
  }
  