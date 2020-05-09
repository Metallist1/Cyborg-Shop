import 'jest';

import * as admin from 'firebase-admin';
import {  renameProduct} from '../index';
//import {Product} from '../models/product';
import {WrappedFunction} from 'firebase-functions-test/lib/main';
import {Order} from '../models/order';
import {Product} from '../models/product';

const testas = require('firebase-functions-test')({
  databaseURL: "https://web-dev-exam-71d64.firebaseio.com",
  projectId: "web-dev-exam-71d64",
  storageBucket: "web-dev-exam-71d64.appspot.com",
}, './service-account.json');

let product: Product = {name:'Test Product', inStock:5,cost:55,description:"This is a very big test",estimatedShipping:5};
let order: Order = {productID:"RandomProduct",name: "RandomName",count:1,cost:1};


describe('index.ts tests', () => {

  let wrapped: WrappedFunction; //Wrapped Function
   beforeAll(() => {
     admin.firestore().collection('products').add(product).then(docRef => {
      product.uId = docRef.id;
      console.log(product);
     });
     admin.firestore().collection('products').doc(product).collection('productList').add().then(docRef => {
       product.uId = docRef.id;
       console.log(product);
     });
   });
  //Post test clean up of database.
  afterAll( () => {
    //admin.firestore().doc(`/orders/RandomOrder`).delete().catch(error =>{console.log(error);});
    testas.cleanup();
  });

  /*test('When buying a product the function will create a sublist called orderlist inside document sublist. This will contain an order', async () => {
    wrapped = testas.wrap(buyProduct);
    const snap = testas.firestore.makeDocumentSnapshot(order, "Orders/RandomOrder");
    await wrapped(snap,{ params: { orderId: "RandomOrder"}});
    const after = await admin.firestore().doc(`Orders/RandomOrder`).collection(`Orderlist`).doc(order.productID).get();
    expect(after.data()).toStrictEqual(order);
  });*/


  test('When rename product is called. productList is renamed.', async () => {
    wrapped = testas.wrap(renameProduct);
    const beforeSnap = testas.firestore.makeDocumentSnapshot({name: 'RandomProduct'}, 'products/RandomProduct'); //Create before product
    const afterSnap = testas.firestore.makeDocumentSnapshot({name: 'RandomProductas'}, 'products/RandomProduct'); // Create after product with changed name
    const change = testas.makeChange(beforeSnap, afterSnap); //Specify that there was a change
    await wrapped(change,{params: {productId: "123" }});
    let tempOrder: Order = {productID:"123",name: "RandomProductas",count:1,cost:1}; // Generate expected order

    const after = await admin.firestore().doc(`orders/RandomOrder`).collection(`productList`).doc(order.productID).get();
    expect(after.data()).toStrictEqual(tempOrder);
  });
});






