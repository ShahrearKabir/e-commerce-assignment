import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: 'Category name should not be empty' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Category description should not be empty' })
  description: string;
}
