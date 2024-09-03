import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class ProductSeeder {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async seed() {
    const products = [
      {
        nombre: 'Smartphone X1',
        descripcion:
          'Último modelo de smartphone con cámara de alta resolución',
        precio: 699.99,
        stock: 100,
        imagen1: '/images/smartphone-x1-1.jpg',
        imagen2: '/images/smartphone-x1-2.jpg',
        imagen3: '/images/smartphone-x1-3.jpg',
      },
      {
        nombre: 'Laptop Pro',
        descripcion: 'Laptop potente para profesionales y gamers',
        precio: 1299.99,
        stock: 50,
        imagen1: '/images/laptop-pro-1.jpg',
        imagen2: '/images/laptop-pro-2.jpg',
        imagen3: '/images/laptop-pro-3.jpg',
      },
      {
        nombre: 'Auriculares Inalámbricos',
        descripcion: 'Auriculares con cancelación de ruido y alta fidelidad',
        precio: 199.99,
        stock: 200,
        imagen1: '/images/auriculares-1.jpg',
        imagen2: '/images/auriculares-2.jpg',
        imagen3: '/images/auriculares-3.jpg',
      },
      {
        nombre: 'Smartwatch Fitness',
        descripcion:
          'Reloj inteligente con seguimiento de actividad y notificaciones',
        precio: 149.99,
        stock: 150,
        imagen1: '/images/smartwatch-1.jpg',
        imagen2: '/images/smartwatch-2.jpg',
        imagen3: '/images/smartwatch-3.jpg',
      },
      {
        nombre: 'Cámara DSLR',
        descripcion: 'Cámara profesional para fotógrafos exigentes',
        precio: 899.99,
        stock: 30,
        imagen1: '/images/camara-1.jpg',
        imagen2: '/images/camara-2.jpg',
        imagen3: '/images/camara-3.jpg',
      },
      // ... Puedes agregar más productos aquí
    ];

    for (const productData of products) {
      const product = this.productRepository.create(productData);
      await this.productRepository.save(product);
    }

    console.log(
      'Productos de ejemplo con tres imágenes han sido agregados a la base de datos',
    );
  }
}
