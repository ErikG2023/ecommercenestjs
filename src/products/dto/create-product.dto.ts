import { IsString, IsNumber, Min, IsPositive } from 'class-validator';

export class CreateProductDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsNumber()
  @IsPositive()
  precio: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  imagen1: string;

  @IsString()
  imagen2: string;

  @IsString()
  imagen3: string;
}
