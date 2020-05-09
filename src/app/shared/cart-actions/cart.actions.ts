import {Product} from '../entities/product';
import {Order} from '../entities/order';

export class AddToCart {
  static readonly type = 'AddToCart';
  constructor(public payload: Product) {}
}

export class RemoveFromCart {
  static readonly type = 'RemoveFromCart';
  constructor(public payload: Product) {}
}

export class CreateOrder {
  static readonly type = 'CreateOrder';
  constructor(public payload: Order) {}
}

export class ClearCart {
  static readonly type = 'ClearCart';
}
