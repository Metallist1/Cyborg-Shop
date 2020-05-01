import { Component, OnInit } from '@angular/core';
import {AuUser} from '../../auth/entities/user';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Logout} from '../../auth/shared/auth.action';
import {AuthState} from '../../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {ProductState} from '../../shared/product-actions/product.state';
import {Product} from '../../shared/entities/product';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {
  @Select(AuthState.loggedInUser) currentUser: Observable<AuUser>;
  currentU: AuUser;

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
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
