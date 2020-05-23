import * as admin from 'firebase-admin';
import { ProductRepository } from "./product.repository";
import {Product} from '../models/product';
import {Order} from '../models/order';
import {OrderProduct} from '../models/orderProduct';


export class ProductRepositoryFirebase implements ProductRepository {
  buyProduct(orderId: any, order: Order): Promise<any> {

    //Buy product
    return admin.firestore().doc(`orders/${orderId}`).collection(`productList`).listDocuments().then(data => { //Get list of all documents
       /* data.forEach(childObj=> { //for each product in list
          childObj.get().then(function(doc) { //aquire singular product
            const prod = doc.data() as Product; //Convert to object of product
            prod.inStock = prod.inStock - order.count; // Use insert order to delete stock from object.
            admin.firestore()
              .doc(`product/${order.productID}`)
              .update(prod).catch()
              .catch(error => {
                console.log(error);
              });
          }).catch(error => {
            console.log(error);
          });
        })*/
      }).catch(error => {
        console.log(error);
      });
  }

  renameProduct(productId: string, beforeP: Product, afterP: Product): Promise<any>  {
      return admin.firestore().collectionGroup('productList').where('productID', '==', productId).get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          const order = doc.data() as OrderProduct;
          const orderId: string = doc.ref.parent.parent!.id;

          order.name = afterP.name;
          admin.firestore().collectionGroup('productList');
          admin.firestore().collection('orders').doc(orderId).collection('productList').doc(doc.id).update(order).catch();
        });
      })
        .catch(error => {
          console.log(error);
        });

  }



}
