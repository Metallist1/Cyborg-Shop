
import { AuUser } from '../entities/user';

import { Injectable } from '@angular/core';

import { User } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';

import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;
import * as firebase from 'firebase';
import FacebookAuthProvider = firebase.auth.FacebookAuthProvider;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
  }

  async loginGoogle() {
    const provider = new GoogleAuthProvider();
    await this.afAuth.signInWithPopup(provider);
    const user = await this.afAuth.currentUser;
    return this.updateUserData(user);
  }

  async loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    await this.afAuth.signInWithPopup(provider);
    const user = await this.afAuth.currentUser;
    return this.updateUserData(user);
  }

  async loginWithEmail(email: string, password: string) {
    await this.afAuth.signInWithEmailAndPassword(email, password);
    const modifiedUser = this.modifycreatedUserData(await this.afAuth.currentUser, email);
    return this.updateUserData(modifiedUser);
  }

  async createNewUser(email: string, password: string, displayName: string) {
    await this.afAuth.createUserWithEmailAndPassword(email, password);
    const modifiedUser = this.modifycreatedUserData(await this.afAuth.currentUser, displayName);
    this.updateUserData(modifiedUser);
  }

  async logout() {
    await this.afAuth.signOut();
    return null;
  }

  private updateUserData({uid, email, displayName}: User) {

    const userRef: AngularFirestoreDocument<AuUser> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      name: displayName,
      email,
    };

    userRef.set(data, {merge: true});

    return data as AuUser;
  }

  private modifycreatedUserData({uid, email}: User, realName: string) {
    const data = {
      uid,
      displayName: realName,
      email,
    };
    return data as User;
  }

}
