import {AuUser} from '../entities/user';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {AuthService} from './auth.service';
import {CreateEmail, LoginWithEmail, LoginWithFaceBook, LoginWithGoogle, Logout} from './auth.action';
import {Injectable} from '@angular/core';

export class AuthStateModel {
  loggedInUser: AuUser;
  userUID: string;
  userName: string;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    loggedInUser: undefined,
    userUID: undefined,
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

  @Selector()
  static userUID(state: AuthStateModel) {
    return state.userUID;
  }

  @Action(LoginWithGoogle)
  loginWithGoogle({getState, setState}: StateContext<AuthStateModel>) {
    return this.authService.loginGoogle().then((result) => {
          const state = getState();
          setState({
          ...state,
          loggedInUser: result,
            userUID: result.uid,
          userName: result.name
        });
        }
      );
  }

  @Action(LoginWithEmail)
  loginWithEmail({getState, setState}: StateContext<AuthStateModel>, {username, password}: LoginWithEmail) {
    return this.authService.loginWithEmail(username, password).then((result) => {
        const state = getState();
        setState({
          ...state,
          loggedInUser: result,
          userUID: result.uid,
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
          userUID: result.uid,
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
          userUID: undefined,
          userName: undefined
        });
      }
    );
  }

  @Action(CreateEmail)
  CreateEmail({getState, setState}: StateContext<AuthStateModel>, {email, password, displayName}: CreateEmail) {
    return this.authService.createNewUser(email, password, displayName);
  }
}
