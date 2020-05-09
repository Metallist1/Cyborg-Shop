import {Product} from '../entities/product';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {ProductService} from '../product-actions/product.service';
import {ReadProducts, SetSelectedProduct, UpdateExistingProduct, WriteNewProduct} from '../product-actions/product.action';
import {tap} from 'rxjs/operators';
import {AddToCart, ClearCart, CreateOrder, RemoveFromCart} from './cart.actions';
import {CartService} from './cart.service';

export class CartStateModel {
  products: Product[];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    products: []
  }
})
@Injectable()
export class CartState {

  constructor(private cartService: CartService) {
  }

  @Selector()
  static getCart(state: CartStateModel) {
    return state.products;
  }

  @Action(AddToCart)
  addToCart({getState, patchState}: StateContext<CartStateModel>, {payload}: AddToCart) {
      const state = getState();
      patchState({
        products: [...state.products, payload]
      });
      console.log(state.products);
  }

  @Action(RemoveFromCart)
  removeFromCart({getState, setState}: StateContext<CartStateModel>, {payload}: RemoveFromCart) {
    const state = getState();
    const filteredArray = state.products.filter(item => item.uid !== payload.uid);
    setState({
      ...state,
      products: filteredArray,
    });
  }


  // TODO
  @Action(CreateOrder)
  createOrder({getState, patchState}: StateContext<CartStateModel>, {payload}: CreateOrder) {
    return this.cartService.createOrder(payload).then((result) => {
      const state = getState();
      patchState({
        products: [...state.products, result]
      });
    });
  }

  @Action(ClearCart)
  clearCart({getState, setState}: StateContext<CartStateModel>) {
    const state = getState();
    setState({
      ...state,
      products: undefined,
    });
  }
}
