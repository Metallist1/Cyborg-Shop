import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Order} from '../entities/order';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private firestore: AngularFirestore) {}

  createOrder(payload: Order) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection('products')
        .add(payload)
        .then(res => {}, err => reject(err));
    });
  }
}
