import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly dataSource: DataSource, // Injecting DataSource for transaction
    ) { }

    findAll(query: any) {
        const { search, page = 1, limit = 10 } = query;
        const qbCategory = this.orderRepository.createQueryBuilder('order');

        return qbCategory
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
    }

    findOne(id: string) {
        return this.orderRepository.findOne({ where: { id } });
    }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const { customerName, customerEmail, products } = createOrderDto;

        // Start a transaction
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            let totalPrice = 0;

            for (const item of products) {
                // Lock the product row for update (prevents race conditions)
                const product = await queryRunner.manager.findOne(Product, {
                    where: { id: item.productId },
                    lock: { mode: 'pessimistic_write' },
                });

                // Check if the product exists
                if (!product) {
                    throw new NotFoundException(`Product with ID ${item.productId} not found`);
                }

                // Check if the requested quantity is available
                if (product.stockQuantity < item.quantity) {
                    throw new BadRequestException(`Insufficient stock for product ${product.name}`);
                }

                totalPrice += product.price * item.quantity;

                // Decrement the stock quantity
                product.stockQuantity -= item.quantity;
                await queryRunner.manager.save(Product, product);
            }

            // Create the order
            const order = this.orderRepository.create({
                customerName,
                customerEmail,
                products,
                totalPrice,
                status: 'Pending',
            });

            const savedOrder = await queryRunner.manager.save(Order, order);

            // Commit the transaction
            await queryRunner.commitTransaction();

            return savedOrder;
        } catch (error) {
            // Roll back the transaction in case of an error
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            // Release the query runner
            await queryRunner.release();
        }
    }

    update(id: string, data: Partial<Order>) {
        return this.orderRepository.update(id, data);
    }
}