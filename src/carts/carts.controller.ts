import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CartsService } from './carts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Controller('carts')
@UseGuards(JwtAuthGuard)
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}

  @Get()
  getCart(@Request() req) {
    return this.cartsService.getCart(req.user);
  }

  @Post('add')
  addItem(@Request() req, @Body() addToCartDto: AddToCartDto) {
    return this.cartsService.addItem(
      req.user,
      addToCartDto.productId,
      addToCartDto.quantity,
    );
  }

  @Delete('remove/:productId')
  removeItem(@Request() req, @Param('productId') productId: string) {
    return this.cartsService.removeItem(req.user, +productId);
  }

  @Delete('clear')
  clearCart(@Request() req) {
    return this.cartsService.clearCart(req.user);
  }
}
