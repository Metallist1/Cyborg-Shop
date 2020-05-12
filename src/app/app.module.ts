import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainViewComponent } from './main/main-view/main-view.component';
import {environment} from '../environments/environment';

import { ProductState } from './shared/product-actions/product.state';
import { AuthState } from './auth/shared/auth.state';
import { ProductListComponent } from './main/product-list/product-list.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { LoginEmailComponent } from './login/login-email/login-email.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginRegisterComponent } from './login/login-register/login-register.component';
import { AdminViewComponent } from './admin/admin-view/admin-view.component';

import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { AdminProductSelectComponent } from './admin/admin-product-select/admin-product-select.component';
import { AdminProductEditComponent } from './admin/admin-product-edit/admin-product-edit.component';
import { SingleProductViewComponent } from './main/order/single-product-view/single-product-view.component';
import { MainNavComponent } from './main/main-nav/main-nav.component';
import { CartViewComponent } from './main/order/cart-view/cart-view.component';
import { OrderViewComponent } from './main/order/order-view/order-view.component';
import {CartState} from './shared/cart-actions/cart.state';
@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ProductListComponent,
    LoginViewComponent,
    LoginEmailComponent,
    LoginRegisterComponent,
    AdminViewComponent,
    AdminProductSelectComponent,
    AdminProductEditComponent,
    SingleProductViewComponent,
    MainNavComponent,
    CartViewComponent,
    OrderViewComponent
  ],
  imports: [NgxsModule.forRoot([ProductState, AuthState, CartState], {
    developmentMode: !environment.production
  }),
    NgxsStoragePluginModule.forRoot({
      key: ['auth',  'product']
    }),
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, ReactiveFormsModule, AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
