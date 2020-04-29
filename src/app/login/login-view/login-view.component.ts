import { Component, OnInit } from '@angular/core';
import {Store} from '@ngxs/store';
import {LoginWithGoogle, LoginWithFaceBook, LoginWithEmail} from '../../auth/shared/auth.action';
@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }
  loginUsingGoogle() {
    this.store.dispatch(new LoginWithGoogle());
  }
  loginUsingFacebook() {
    this.store.dispatch(new LoginWithFaceBook());
  }
}
