import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../../shared/product-actions/product.state';
import {Observable} from 'rxjs';
import {Product} from '../../../shared/entities/product';
import {Router} from '@angular/router';
import {ReadProducts, SetSelectedProduct} from '../../../shared/product-actions/product.action';
import {CartState} from '../../../shared/cart-actions/cart.state';
import {RemoveFromCart} from '../../../shared/cart-actions/cart.actions';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit {
  @Select(CartState.getCart) Products: Observable<Product[]>;

  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
  }

  removeItem(product: Product) {
    this.store.dispatch(new RemoveFromCart(product));
  }
}
