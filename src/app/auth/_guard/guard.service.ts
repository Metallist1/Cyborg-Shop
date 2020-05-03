import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../shared/auth.state';
import {Observable} from 'rxjs';
import {AuUser} from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {
  @Select(AuthState.loggedInUser) currentUser: Observable<AuUser>;
  currentU: AuUser;

  constructor(private router: Router, private store: Store) {
    this.currentUser.subscribe(
      (data) => {
        console.log(data);
        this.currentU = data;
      });
  }

  canActivate() {
    console.log(this.currentU);
    if (this.currentU) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    // this.router.navigate(['/']);
    return false;
  }
}
