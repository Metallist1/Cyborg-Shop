import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {AuUser} from '../../auth/entities/user';
import {Router} from '@angular/router';
import {Logout} from '../../auth/shared/auth.action';
import {CartState} from '../../shared/cart-actions/cart.state';
import {Product} from '../../shared/entities/product';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  @Select(AuthState.loggedInUser) currentUser: Observable<AuUser>;
  @Select(CartState.getCart) currentCart: Observable<Product[]>;
  currentU: AuUser;
  currentCartCount: number;

  ngOnInit(): void {
  }

  constructor(
    private router: Router,
    private store: Store
  ) {

    this.currentUser.subscribe(
        (data) => {
          this.currentU = data;
        });
    this.currentCart.subscribe(
        (data) => {
          this.currentCartCount = data.length;
        });
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
