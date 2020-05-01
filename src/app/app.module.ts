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
import { ProductSubmitFormComponent } from './main/product-submit-form/product-submit-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import { LoginViewComponent } from './login/login-view/login-view.component';
import { LoginEmailComponent } from './login/login-email/login-email.component';
// ...omitted
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginRegisterComponent } from './login/login-register/login-register.component';
@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    ProductListComponent,
    ProductSubmitFormComponent,
    LoginViewComponent,
    LoginEmailComponent,
    LoginRegisterComponent
  ],
  imports: [NgxsModule.forRoot([ProductState, AuthState], {
    developmentMode: !environment.production
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
