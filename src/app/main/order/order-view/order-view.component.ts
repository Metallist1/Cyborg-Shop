import { Component, OnInit } from '@angular/core';
import {Select, Selector, Store} from '@ngxs/store';
import {CartState} from '../../../shared/cart-actions/cart.state';
import {Observable} from 'rxjs';
import {Product} from '../../../shared/entities/product';
import {AuthState, AuthStateModel} from '../../../auth/shared/auth.state';
import {Router} from '@angular/router';
import {CreateOrder, DecreaseCountToProduct, IncreaseCountToProduct, RemoveFromCart} from '../../../shared/cart-actions/cart.actions';
import {Order} from '../../../shared/entities/order';
import {AuUser} from '../../../auth/entities/user';

@Component({
  selector: 'app-order-view',
  templateUrl: './order-view.component.html',
  styleUrls: ['./order-view.component.css']
})
export class OrderViewComponent implements OnInit {
  @Select(CartState.getOrderInfo) order: Observable<Order>;
  @Select(AuthState.loggedInUser) currentUser: Observable<AuUser>;
  @Select(CartState.getRecentOrderCart) Products: Observable<Product[]>;

  realOrder: Order;
  currentU: AuUser;
  orderTotal: string;
  orderTotalAfterShipping: string;

  constructor(private store: Store, private router: Router) {

  }

  ngOnInit() {
    this.order.subscribe(
      (data) => {
        this.realOrder = data;
        this.orderTotal = '' + data.totalCost;
        const newAmount = data.totalCost + 10 ;
        this.orderTotalAfterShipping = '' + newAmount;
      });
    this.currentUser.subscribe(
        (data) => {
          this.currentU = data;
        });
  }

}
