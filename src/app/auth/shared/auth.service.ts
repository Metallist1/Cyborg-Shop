
import {AuUser} from '../entities/user';

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {auth, User} from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import * as firebase from 'firebase';
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<AuUser>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {}

  async loginGoogle() {
    const provider = new GoogleAuthProvider();
    await this.afAuth.signInWithPopup(provider);
    const user = await this.afAuth.currentUser;
    return  this.updateUserData(user);
  }
  async loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    await this.afAuth.signInWithPopup(provider);
    const user = await this.afAuth.currentUser;
    return  this.updateUserData(user);
  }
  async logout() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({ uid, email, displayName}: User) {

    const userRef: AngularFirestoreDocument<AuUser> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      name : displayName,
      email,
    };

    userRef.set(data, { merge: true });

    return data as AuUser;
  }
}
