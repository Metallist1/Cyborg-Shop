import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Order} from '../entities/order';
import {Product} from '../entities/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private firestore: AngularFirestore) {}

  createOrder(payload: Order, products: Product[]) {
    return new Promise<any>((resolve, reject) => {
      this.firestore
        .collection('orders')
        .add(payload)
        .then(res => {
           products.forEach(childObj => {
            this.firestore.collection('orders').ref.doc(res.id).collection(`/productList/`).add(
              {
                cost: childObj.cost,
                count: childObj.count,
                name: childObj.name,
                productID: childObj.uid
              }
            );
          });
    }, err => reject(err));
    });
  }
}
