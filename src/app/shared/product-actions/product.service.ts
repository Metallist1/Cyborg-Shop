
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

  ReadProductsFromBase(tableName: string, numberOfObjects: number, orderBy: string, order: string, type: string) {
    if (type === 'next') {
      this.ref = this.next( numberOfObjects, orderBy, order);
    } else if (type === 'back') {
      this.ref = this.before(numberOfObjects, orderBy, order);
    } else {
      this.ref = this.default(numberOfObjects, orderBy, order);
    }

    const queryExecuted =  this.firestore.collection(tableName, this.ref).snapshotChanges();
    // Map result set
    return queryExecuted.pipe(
      map (courses => {
          this.first = courses[0].payload.doc;
          this.last = courses[courses.length - 1].payload.doc;
          return courses.map(a => {
            // @ts-ignore
            const name = a.payload.doc.data().name;
            // @ts-ignore
            const cost = a.payload.doc.data().cost;
            // @ts-ignore
            const totalCost = a.payload.doc.data().cost;
            // @ts-ignore
            const description = a.payload.doc.data().description;
            // @ts-ignore
            const estimatedShipping = a.payload.doc.data().estimatedShipping;
            // @ts-ignore
            const inStock = a.payload.doc.data().inStock;
            // @ts-ignore
            const img = a.payload.doc.data().img;
            // @ts-ignore
            const img2 = a.payload.doc.data().img2;
            // @ts-ignore
            const img3 = a.payload.doc.data().img3;
            // @ts-ignore
            const img4 = a.payload.doc.data().img4;
            // @ts-ignore
            const img5 = a.payload.doc.data().img5;
            const uid = a.payload.doc.id;
            return {uid, name, cost, description, estimatedShipping, inStock, img, img2, img3, img4, img5, count : 1, totalCost} as Product;
           });
        }
      ));
  }

  private default(numberOfObjects: number, orderBy: string, order: string) {
    return ref => ref.orderBy(orderBy, order)
      .limit(numberOfObjects);
  }

  private next(numberOfObjects: number, orderBy: string, order: string) {
    return  ref => ref.orderBy(orderBy, order)
      .startAfter(this.last)
      .limit(numberOfObjects);
  }

  private before(numberOfObjects: number, orderBy: string, order: string) {
    return ref => ref.orderBy(orderBy, order)
      .endBefore(this.first)
      .limitToLast(numberOfObjects);
  }
  // end of pagination


  CreateProductInBase(data: Product) {
    return new Promise<any>((resolve, reject) => {
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
