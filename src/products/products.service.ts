import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    ) { }

    async findAll(query: any) {
        const { category, search, page = 1, limit = 10 } = query;
        const qbProduct = this.productRepository.createQueryBuilder('product');
        const qbCategory = this.categoryRepository.createQueryBuilder('category');

        if (category) qbCategory.where('category.name = :category', { category });
        const categoryData = await qbCategory.getOne();

        if (category) qbProduct.andWhere('product.category = :category', { category: categoryData?.id });
        if (search) qbProduct.andWhere('product.name ILIKE :search', { search: `%${search}%` });

        return qbProduct
            .skip((page - 1) * limit)
            .take(limit)
            .innerJoinAndSelect('product.category', 'category')
            .getMany();
    }

    findOne(id: string) {
        return this.productRepository.findOne({ where: { id }, relations: ['category'] });
    }

    create(data: Partial<Product>) {
        return this.productRepository.save(data);
    }

    update(id: string, data: Partial<Product>) {
        return this.productRepository.update(id, data);
    }

    remove(id: string) {
        return this.productRepository.delete(id);
    }
}