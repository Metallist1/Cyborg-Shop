
import {Product} from '../entities/product';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ProductService} from './product.service';
import {DeleteProduct, ReadProducts, SetSelectedProduct, UpdateExistingProduct, WriteNewProduct} from './product.action';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';

export class ProductStateModel {
  products: Product[];
  selectedProduct: Product;
  shouldPaginationStop: boolean;
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    products: [],
    selectedProduct: undefined,
    shouldPaginationStop: false
  }
})

@Injectable()
export class ProductState {

  constructor(private productService: ProductService) {
  }

  @Selector()
  static getALLProduct(state: ProductStateModel) {
    return state.products;
  }

  @Selector()
  static getSelectedProduct(state: ProductStateModel) {
    return state.selectedProduct;
  }

  @Selector()
  static getIsFinished(state: ProductStateModel) {
    return state.shouldPaginationStop;
  }

  @Action(ReadProducts)
  getProducts({getState, setState}: StateContext<ProductStateModel>, {tableName, numberOfElements,
    orderByType, order, type}: ReadProducts) {
    return this.productService.ReadProductsFromBase(tableName, numberOfElements, orderByType, order, type).pipe(tap((result) => {
      const state = getState();

      // This is a signal to the controller to disable / delete next button
      let isPaginationBad = false;

      if (result.length < numberOfElements) {
        isPaginationBad = true;
      }

      setState({
        ...state,
        shouldPaginationStop: isPaginationBad,
        products: result,
      });
    }));
  }

  @Action(WriteNewProduct)
  WriteProducts({getState, patchState}: StateContext<ProductStateModel>, {payload}: WriteNewProduct) {
    console.log(payload);
    return this.productService.CreateProductInBase(payload).then((result) => {
      const state = getState();
      patchState({
        products: [...state.products, result]
      });
    });
  }

  @Action(UpdateExistingProduct)
  UpdateProduct({getState, setState}: StateContext<ProductStateModel>, {payload}: UpdateExistingProduct) {
    return this.productService.UpdateProductInBase(payload).then((result) => {
      const state = getState();
      const productList = [...state.products];
      const productIndex = productList.findIndex(item => item.uid === payload.uid);
      productList[productIndex] = payload;
      setState({
        ...state,
        products: productList,
      });
    });
  }

  @Action(DeleteProduct)
    DeleteProduct({getState, setState}: StateContext<ProductStateModel>, {uid}: DeleteProduct) {
      return this.productService.DeleteProductInBase(uid).apply(() => {
        const state = getState();
        const filteredArray = state.products.filter(item => item.uid !== uid);
        setState({
          ...state,
          products: filteredArray,
        });
      });
  }

  @Action(SetSelectedProduct)
  setSelectedProductId({getState, setState}: StateContext<ProductStateModel>, {payload}: SetSelectedProduct) {
    const state = getState();
    setState({
      ...state,
      selectedProduct: payload
    });
  }
}

