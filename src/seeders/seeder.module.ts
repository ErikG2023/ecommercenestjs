import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { ProductSeeder } from './product.seeder';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductSeeder],
  exports: [ProductSeeder],
})
export class SeederModule {}
