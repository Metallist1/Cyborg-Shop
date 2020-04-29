import {AuUser} from '../entities/user';

export class LoginWithGoogle {
  static readonly type = '[Auth] LoginWithGoogle';
}
export class LoginWithFaceBook {
  static readonly type = '[Auth] LoginWithFaceBook';
}
export class LoginWithEmail {
  static readonly type = '[Auth] LoginWithEmail';
  constructor(public username: string, public password: string) {}
}
export class Logout {
  static readonly type = '[Auth] Logout';
}
