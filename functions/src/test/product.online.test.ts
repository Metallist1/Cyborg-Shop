import 'jest';

import * as admin from 'firebase-admin';
import {  renameProduct} from '../index';
//import {Product} from '../models/product';
import {WrappedFunction} from 'firebase-functions-test/lib/main';
import {Order} from '../models/order';
import {Product} from '../models/product';
import {OrderProduct} from '../models/orderProduct';

const testas = require('firebase-functions-test')({
  databaseURL: "https://web-dev-exam-71d64.firebaseio.com",
  projectId: "web-dev-exam-71d64",
  storageBucket: "web-dev-exam-71d64.appspot.com",
}, './service-account.json');
//productID , name, count , cost
let product: Product = {name:'Test', inStock:5,cost:55,description:"Test",estimatedShipping:5,img:"Test"};
let order: Order = {userID:'',totalCost: 5, shippingID:"515212",status:"Test",estimatedShippingTime:7};
let orderProduct1: OrderProduct = {name:"Test", cost:55, count:2,productID:"TestProduct"};
describe('index.ts tests', () => {

  let wrapped: WrappedFunction; //Wrapped Function

    //Add product
   beforeAll(() => {
     admin.firestore().collection('products').doc('TestProduct').set(product).catch(error =>{console.log(error);});
    //Add order
     admin.firestore().collection('orders').doc('TestOrder').set(order).catch(error =>{console.log(error);});
     admin.firestore().collection('orders').doc('TestOrder').collection('productList')
       .doc('TestBroughtProduct').set(orderProduct1).catch(error =>{console.log(error);});
     //doc(product.uId).collection('productList').add().then
   });
  //Post test clean up of database.
  afterAll( () => {
    admin.firestore().doc(`/products/TestProduct`).delete().catch(error =>{console.log(error);});
    admin.firestore().doc(`/orders/TestOrder`).delete().catch(error =>{console.log(error);});
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

    const beforeSnap = testas.firestore.makeDocumentSnapshot({name: 'Test'}, 'products/TestProduct'); //Create before product
    const afterSnap = testas.firestore.makeDocumentSnapshot({name: 'AnotherName'}, 'products/TestProduct'); // Create after product with changed name
    const change = testas.makeChange(beforeSnap, afterSnap); //Specify that there was a change

    await wrapped(change,{params: {productId: 'TestProduct' }}).then(() =>{
      const tempOrder: OrderProduct = {name:"AnotherName", cost:55, count:2,productID:"TestProduct"}; // Generate expected order
      admin.firestore().doc(`/orders/TestOrder`).collection(`productList`)
        .doc('TestBroughtProduct').get().then(data => {
          expect(data.data()).toStrictEqual(tempOrder);
         }).catch(error =>{console.log(error);});
    });
  });
});






