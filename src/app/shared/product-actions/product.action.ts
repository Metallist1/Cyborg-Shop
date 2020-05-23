import {Product} from '../entities/product';

export class ReadProducts {
  static readonly type = 'ReadProducts';
  // tslint:disable-next-line:max-line-length
  constructor(public tablename: string, public numberOfElements: number, public orderByType: string,
              public order: string, public type: string) {}
}

export class WriteNewProduct {
  static readonly type = '[Auth] WriteNewProduct';
  constructor(public payload: Product) {}
}

export class UpdateExistingProduct {
  static readonly type = '[Auth] UpdateExistingProduct';
  constructor(public payload: Product) {}
}

export class DeleteProduct {
  static readonly type = '[Auth] DeleteProduct';
  constructor(public uid: string) {}
}

export class SetSelectedProduct {
  static readonly type = '[Auth] SetProduct';

  constructor(public payload: Product) {}
}
