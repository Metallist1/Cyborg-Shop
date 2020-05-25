import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../../shared/product-actions/product.state';
import {Observable} from 'rxjs';
import {Product} from '../../../shared/entities/product';
import {Router} from '@angular/router';
import {ReadProducts, SetSelectedProduct} from '../../../shared/product-actions/product.action';
import {CartState} from '../../../shared/cart-actions/cart.state';
import {CreateOrder, DecreaseCountToProduct, IncreaseCountToProduct, RemoveFromCart} from '../../../shared/cart-actions/cart.actions';
import {AuthState} from '../../../auth/shared/auth.state';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  @Select(CartState.getCart) Products: Observable<Product[]>;
  @Select(AuthState.userUID) userID: Observable<string>;

  realUserID: string;

  allProductCost: string;
  allProductCostAfterShipping: string;
  constructor(private store: Store, private router: Router) {
    this.userID.subscribe(
      (data) => {
        this.realUserID = data;
      });
    this.Products.subscribe(
        (data) => {
          let productCost = 0;
          data.forEach(childObj => {
            productCost = productCost + Number(childObj.totalCost);
          });
          this.allProductCost = '' + productCost ;
          productCost = productCost + 10;
          this.allProductCostAfterShipping = '' + productCost;
        });
  }

  ngOnInit() {
  }
  removeItem(product: Product) {
    this.store.dispatch(new RemoveFromCart(product));
  }

  placeOrder() {
    if (this.realUserID === undefined){
      this.realUserID = '-1';
    }
    this.store.dispatch(new CreateOrder(this.realUserID));
    this.router.navigate(['/order']);
  }

  addToStock(product: Product) {
    this.store.dispatch(new IncreaseCountToProduct(product));
  }

  removeFromStock(product: Product) {
    this.store.dispatch(new DecreaseCountToProduct(product));
  }
}
