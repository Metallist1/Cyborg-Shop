import { Component, OnInit } from '@angular/core';
import {AuUser} from '../../auth/entities/user';
import {Router} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Logout} from '../../auth/shared/auth.action';
import {AuthState} from '../../auth/shared/auth.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  ngOnInit(): void {
  }

  constructor(){}
}
