import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ProductSeeder } from './seeders/product.seeder';

@Injectable()
export class SeedCommand {
  constructor(private readonly productSeeder: ProductSeeder) {}

  @Command({ command: 'seed:products', describe: 'Seed products' })
  async seedProducts() {
    await this.productSeeder.seed();
  }
}
