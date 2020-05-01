import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {CreateEmail, Logout} from '../../auth/shared/auth.action';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    // redirect to home if already logged in

  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    this.store.dispatch(new Logout());
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    const userN = this.registerForm.value.username;
    const pass = this.registerForm.value.password;
    const displayName = this.registerForm.value.name;

    this.loading = true;
    this.store.dispatch(new CreateEmail(userN, pass, displayName))
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          this.loading = false;
        });
  }
}
