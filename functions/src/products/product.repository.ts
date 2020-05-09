
import {Product} from '../models/product';
import {Order} from '../models/order';

export interface ProductRepository {

  buyProduct(orderId: any, order: Order): Promise<any>;

  renameProduct(productId: string, beforeP: Product, afterP: Product): Promise<any>;

}
