import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginWithEmail} from '../../auth/shared/auth.action';
import {first} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {ClearCart} from '../../shared/cart-actions/cart.actions';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css']
})
export class LoginEmailComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    const email = this.loginForm.value.username;
    const pass = this.loginForm.value.password;

    this.loading = true;
    this.store.dispatch(new LoginWithEmail(email, pass))
      .pipe(first())
      .subscribe(
        data => {
          this.store.dispatch(new ClearCart());
          this.router.navigate(['/']);
        },
        error => {
          this.loading = false;
        });
  }
}
