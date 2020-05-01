import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainViewComponent } from './main/main-view/main-view.component';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { LoginRegisterComponent } from './login/login-register/login-register.component';
const routes: Routes = [{path: '', component: MainViewComponent },
  {path: 'login', component:  LoginViewComponent},
  {path: 'register', component:  LoginRegisterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
