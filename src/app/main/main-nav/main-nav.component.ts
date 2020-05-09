import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {AuthState} from '../../auth/shared/auth.state';
import {Observable} from 'rxjs';
import {AuUser} from '../../auth/entities/user';
import {Router} from '@angular/router';
import {Logout} from '../../auth/shared/auth.action';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
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
