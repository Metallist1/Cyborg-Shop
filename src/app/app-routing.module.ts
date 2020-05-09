import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from './auth/_guard/guard.service';
import { MainViewComponent } from './main/main-view/main-view.component';
import { SingleProductViewComponent } from './main/order/single-product-view/single-product-view.component';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { LoginRegisterComponent } from './login/login-register/login-register.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';
import { CartViewComponent } from './main/order/cart-view/cart-view.component';
import { OrderViewComponent } from './main/order/order-view/order-view.component';

const routes: Routes = [{path: '', component: MainViewComponent },
  {path: 'login', component:  LoginViewComponent},
  {path: 'register', component:  LoginRegisterComponent},
  {path: 'single-product-view', component:  SingleProductViewComponent},
  {path: 'cart', component:  CartViewComponent},
  {path: 'order', component:  OrderViewComponent},
  {path: 'admin', component:  AdminViewComponent,  canActivate: [GuardService]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
