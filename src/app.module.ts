import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { AuthModule } from './auth/auth.module';
import { CommandModule } from 'nestjs-command';
import { SeederModule } from './seeders/seeder.module';
import { SeedCommand } from './seed.command';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // Nota: Configura esto en false para producción
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ProductsModule,
    CartsModule,
    OrdersModule,
    PaymentsModule,
    AuthModule,
    CommandModule,
    SeederModule,
  ],
  providers: [SeedCommand],
})
export class AppModule {}
