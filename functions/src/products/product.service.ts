import { ProductRepository } from "./product.repository";
import { Product } from "../models/product";
import {Order} from '../models/order';

export class ProductService {

  constructor(private productRepository: ProductRepository) {}

  buyProduct(orderId: string, order:Order) : Promise<any>{
    return this.productRepository.buyProduct(orderId, order);
  }

  renameProduct(productId: string, beforeP: Product, afterP: Product) {
    return this.productRepository.renameProduct(productId, beforeP,afterP);
  }

}
