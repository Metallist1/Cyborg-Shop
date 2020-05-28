import {Product} from '../entities/product';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AddToCart, ClearCart, CreateOrder, DecreaseCountToProduct, IncreaseCountToProduct, RemoveFromCart} from './cart.actions';
import {CartService} from './cart.service';
import {Order} from '../entities/order';

export class CartStateModel {
  products: Product[];
  madeOrder: Order;
  productsInOrder: Product[];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    products: [],
    madeOrder: undefined,
    productsInOrder: []
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
  @Selector()
  static getOrderInfo(state: CartStateModel) {
    return state.madeOrder;
  }
  @Selector()
  static getRecentOrderCart(state: CartStateModel) {
    return state.productsInOrder;
  }
  @Action(AddToCart)
  addToCart({getState, patchState, setState}: StateContext<CartStateModel>, {payload}: AddToCart) {
      const state = getState();
      const productList = [...state.products];
      const productIndex = productList.findIndex(item => item.uid === payload.uid);
      if (productIndex === -1) {
        patchState({
          products: [...state.products, payload]
        });
      } else {
        const copiedArray = JSON.parse(JSON.stringify(productList));
        const newProduct = copiedArray[productIndex];
        newProduct.count++;
        newProduct.totalCost = newProduct.count * newProduct.cost;
        if (newProduct.count <= newProduct.inStock) {
          copiedArray[productIndex] = newProduct;

          setState({
            ...state,
            products: copiedArray,
          });
        }
      }
  }
  @Action(IncreaseCountToProduct)
  increaseCountToProduct({getState, setState}: StateContext<CartStateModel>, {payload}: IncreaseCountToProduct) {
    const state = getState();
    const productList = [...state.products];
    const productIndex = productList.findIndex(item => item.uid === payload.uid);
    if (productIndex !== -1) {
      const copiedArray = JSON.parse(JSON.stringify(productList));
      const newProduct = copiedArray[productIndex];
      newProduct.count++;
      newProduct.totalCost = newProduct.count * newProduct.cost;
      if (newProduct.count <= newProduct.inStock) {
        copiedArray[productIndex] = newProduct;

        setState({
          ...state,
          products: copiedArray,
        });
      }
    }
  }

  @Action(DecreaseCountToProduct)
  decreaseCountToProduct({getState, setState}: StateContext<CartStateModel>, {payload}: DecreaseCountToProduct) {
    const state = getState();
    const productList = [...state.products];
    const productIndex = productList.findIndex(item => item.uid === payload.uid);
    if (productIndex !== -1) {
      const copiedArray = JSON.parse(JSON.stringify(productList));
      const newProduct = copiedArray[productIndex];
      newProduct.count--;
      newProduct.totalCost = newProduct.totalCost - newProduct.cost;
      if (newProduct.count > 0) {
        copiedArray[productIndex] = newProduct;

        setState({
          ...state,
          products: copiedArray,
        });
      }
    }
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

  @Action(CreateOrder)
  createOrder({getState, setState, patchState}: StateContext<CartStateModel>, {payload}: CreateOrder) {
    const state = getState();
    const newOrder = this.processOrder(payload, state.products) as Order;
    if (state.products.length !== 0) {
      this.cartService.createOrder(newOrder, state.products);
      setState({
        ...state,
        madeOrder: newOrder,
        productsInOrder: state.products,
        products: [],
      });
    }
  }

  @Action(ClearCart)
  clearCart({getState, setState}: StateContext<CartStateModel>) {
    const state = getState();
    setState({
      ...state,
      products: [],
    });
  }

  private processOrder(userIDs: string, allProducts: Product[]) {
    return {
      userID: userIDs,
      shippingID: this.randomIntFromInterval(),
      estimatedShippingTime: this.getHighestShippingTime(allProducts),
      status: 'Processing',
      totalCost: this.getTotalCost(allProducts)
    };
  }
  private randomIntFromInterval() {
      return Math.floor(Math.random() * (999999999 - 100000000 + 1) + 100000000);
    }
  private getHighestShippingTime(allProducts: Product[]) {
    const copiedArray = JSON.parse(JSON.stringify(allProducts));
    const sortedPeaks = copiedArray.sort((a, b) => b.estimatedShipping - a.estimatedShipping)

    return sortedPeaks[0].estimatedShipping;
  }

  private getTotalCost(allProducts: Product[]) {
    let realSum = 0;

    const distinctThings = allProducts.filter(
      (thing, i, arr) => arr.findIndex(t => t.uid === thing.uid) === i
    );

    distinctThings.forEach(childObj => {
        realSum = realSum + (childObj.cost * childObj.count);
    });
    return realSum;
  }
}
