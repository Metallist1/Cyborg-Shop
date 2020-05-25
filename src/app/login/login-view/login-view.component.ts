import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {LoginWithGoogle, LoginWithFaceBook, LoginWithEmail} from '../../auth/shared/auth.action';
import {Router} from '@angular/router';
import {AuthState} from '../../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {AuUser} from '../../auth/entities/user';
import {ClearCart} from '../../shared/cart-actions/cart.actions';
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  @Select(AuthState.loggedInUser) currentUser: Observable<AuUser>;
  currentU: AuUser;
  constructor(private store: Store,
              private router: Router) {

    this.currentUser.subscribe(
      (data) => {
        this.currentU = data;
      });

    if (this.currentU){
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
  }
}
