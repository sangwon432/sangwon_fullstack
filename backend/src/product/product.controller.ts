import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get('all')
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Delete(':id')
  async deleteProductById(@Param('id') id: string) {
    return await this.productService.deleteProductById(id);
  }

  @Patch(':id')
  async updateProductById(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return await this.productService.updateProductById(id, updateProductDto);
  }
}
