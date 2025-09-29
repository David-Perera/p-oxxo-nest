import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {v4 as uuid} from 'uuid'; 

@Injectable()
export class ProductsService {
  private products:CreateProductDto[] = [
    {
      productId: uuid(),
      productName:"sabritas Normal 48g",
      price:29,
      countSeal:3,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName:"Coca Cola 600ml",
      price:40,
      countSeal:2,
      provider: uuid(),
    },
    {
      productId: uuid(),
      productName:"Agua ciel 1L",
      price:15,
      countSeal:2,
      provider: uuid(),
    }
  ];
  create(createProductDto: CreateProductDto) {
    createProductDto.productId = uuid();
    this.products.push(createProductDto)
    return createProductDto;
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.filter((products) => products.productId === id)[0];
    if(!productFound) throw new NotFoundException;
    return productFound;
  }

  findByProveider(id:string){
    const productsFound = this.products.filter((products)=> products.provider === id);
    if(!productsFound) throw new NotFoundException;
    return productsFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let productToUpdate=this.findOne(id);
    productToUpdate={
      ...productToUpdate,
      ...updateProductDto,
   };
   return productToUpdate
  }

  remove(id: string) {
    const removedProduct = this.findOne(id)
    return this.products.filter((products)=> products.productId !== removedProduct.productId)
  }
}
