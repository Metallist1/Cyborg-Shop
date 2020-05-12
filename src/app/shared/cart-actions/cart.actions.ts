import {Product} from '../entities/product';

export class AddToCart {
  static readonly type = 'AddToCart';
  constructor(public payload: Product) {}
}
export class IncreaseCountToProduct {
  static readonly type = 'IncreaseCountToProduct';
  constructor(public payload: Product) {}
}

export class DecreaseCountToProduct {
  static readonly type = 'DecreaseCountToProduct';
  constructor(public payload: Product) {}
}

export class RemoveFromCart {
  static readonly type = 'RemoveFromCart';
  constructor(public payload: Product) {}
}

export class CreateOrder {
  static readonly type = 'CreateOrder';
  constructor(public payload: string) {}
}

export class ClearCart {
  static readonly type = 'ClearCart';
}
