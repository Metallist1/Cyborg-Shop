import {AuUser} from '../entities/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthService} from './auth.service';
import {LoginWithFaceBook, LoginWithGoogle, Logout} from './auth.action';
import {tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {UpdateExistingProduct} from '../../shared/product-actions/product.action';
import {ProductStateModel} from '../../shared/product-actions/product.state';

export class AuthStateModel {
  loggedInUser: AuUser;
  userName: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedInUser: undefined,
    userName: undefined
  }
})
@Injectable()
export class AuthState {

  constructor(private authService: AuthService) {}

  @Selector()
  static loggedInUser(state: AuthStateModel) {
    return state.loggedInUser;
  }

  @Selector()
  static loggedInUserName(state: AuthStateModel) {
    return state.userName;
  }

  @Action(LoginWithGoogle)
  loginWithGoogle({getState, setState}: StateContext<AuthStateModel>) {
    return this.authService.loginGoogle().then((result) => {
          const state = getState();
          setState({
          ...state,
          loggedInUser: result,
          userName: result.name
        });
        }
      );
  }
  @Action(LoginWithFaceBook)
  loginWithFacebook({getState, setState}: StateContext<AuthStateModel>) {
    return this.authService.loginWithFacebook().then((result) => {
        const state = getState();
        setState({
          ...state,
          loggedInUser: result,
          userName: result.name
        });
      }
    );
  }

  @Action(Logout)
  logout({getState, setState, dispatch}: StateContext<AuthStateModel>) {
    return this.authService.logout().then((result) => {
        const state = getState();
        setState({
          ...state,
          loggedInUser: undefined,
          userName: undefined
        });
      }
    );
  }
}
