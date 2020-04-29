import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainViewComponent } from './main/main-view/main-view.component';
import { LoginViewComponent } from './login/login-view/login-view.component';
const routes: Routes = [{path: '', component: MainViewComponent },
  {path: 'login', component:  LoginViewComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
