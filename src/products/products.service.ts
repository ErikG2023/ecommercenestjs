import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    console.log(
      'ProductsService: Retrieving all products with pagination:',
      paginationQuery,
    );
    const { limit = 10, offset = 0 } = paginationQuery;
    return this.productsRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async decreaseStock(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne(id);
    if (product.stock < quantity) {
      throw new Error(`Not enough stock for product ${product.nombre}`);
    }
    product.stock -= quantity;
    return this.productsRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return this.productsRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
  }

  async search(query: string) {
    return this.productsRepository
      .createQueryBuilder('product')
      .where('product.nombre LIKE :query OR product.descripcion LIKE :query', {
        query: `%${query}%`,
      })
      .getMany();
  }
}
