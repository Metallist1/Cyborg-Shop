import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {CartState} from '../../../shared/cart-actions/cart.state';
import {Observable} from 'rxjs';
import {Product} from '../../../shared/entities/product';
import {AuthState} from '../../../auth/shared/auth.state';
import {Router} from '@angular/router';
import {CreateOrder, DecreaseCountToProduct, IncreaseCountToProduct, RemoveFromCart} from '../../../shared/cart-actions/cart.actions';
import {Order} from '../../../shared/entities/order';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  @Select(CartState.getOrderInfo) order: Observable<Order>;
  @Select(CartState.getRecentOrderCart) Products: Observable<Product[]>;

  realOrder: Order;

  constructor(private store: Store, private router: Router) {
    this.order.subscribe(
      (data) => {
        console.log(data);
        this.realOrder = data;
      });
  }

  ngOnInit() {
  }

}
