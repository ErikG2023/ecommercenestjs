import { IsString, IsEmail, MinLength, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(2)
  nombre: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(['admin', 'user'], {
    message: 'Rol must be either "admin" or "user"',
  })
  rol: string;
}
