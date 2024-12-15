import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) { }

    findAll(query: any) {
        const { search, page = 1, limit = 10 } = query;
        const qbCategory = this.categoryRepository.createQueryBuilder('category');

        if (search) qbCategory.andWhere('product.name ILIKE :search', { search: `%${search}%` });

        return qbCategory
            .skip((page - 1) * limit)
            .take(limit)
            .innerJoinAndSelect('category.products', 'product')
            .getMany();
    }

    findOne(id: string) {
        return this.categoryRepository.findOne({ where: { id }, relations: ['products'] });
    }

    create(data: Partial<Category>) {
        return this.categoryRepository.save(data);
    }

    update(id: string, data: Partial<Category>) {
        return this.categoryRepository.update(id, data);
    }

    remove(id: string) {
        return this.categoryRepository.delete(id);
    }
}