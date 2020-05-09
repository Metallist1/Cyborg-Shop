
import { Injectable } from '@angular/core';
import {Product} from '../entities/product';
import {map} from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: AngularFirestore) {}


  // pagination
  ref: any;
  first: any;
  last: any;
  ReadProductsFromBase(tablename: string, type: string) {
    if (type === 'next') {
      this.ref = this.next();
    } else if (type === 'back') {
      this.ref = this.before();
    } else {
      this.ref = this.default();
    }

    const queryExecuted =  this.firestore.collection(tablename, this.ref).snapshotChanges();
    // Get old refrences for pagination
    queryExecuted.subscribe(data => {
      this.first = data[0].payload.doc;
      this.last = data[data.length - 1].payload.doc;
    });
    // Map result set
    return queryExecuted.pipe(
      map (courses => courses.map(a => {
          // @ts-ignore
        const name = a.payload.doc.data().name;
        // @ts-ignore
        const cost = a.payload.doc.data().cost;
        // @ts-ignore
        const description = a.payload.doc.data().description;
        // @ts-ignore
        const estimatedShipping = a.payload.doc.data().estimatedShipping;
        // @ts-ignore
        const inStock = a.payload.doc.data().inStock;
        // @ts-ignore
        const img = a.payload.doc.data().img;
        const uid = a.payload.doc.id;

        return {uid, name, cost, description, estimatedShipping, inStock,img} as Product;
        })
      ));
  }

  private next() {
    return  ref => ref.orderBy('name', 'desc')
      .startAfter(this.last)
      .limit(4);
  }

  private default() {
    return ref => ref.orderBy('name', 'desc')
      .limit(4);
  }
  private before() {
    return ref => ref.orderBy('name', 'desc')
      .endBefore(this.first)
      .limitToLast(4);
  }
  // end of pagination


  CreateProductInBase(data: Product) {
    return new Promise<any>((resolve, reject) =>{
      this.firestore
        .collection('products')
        .add(data)
        .then(res => {}, err => reject(err));
    });
  }

  UpdateProductInBase(data: Product) {
    return this.firestore
      .doc(`products/${data.uid}`)
      .update(data);
  }

  DeleteProductInBase(uid: string) {
    return  data => this.firestore
      .collection('products')
      .doc(uid)
      .delete();
  }
}
