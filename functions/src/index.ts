import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { DependencyFactory } from './dependency-factory';

const dependencyFactory = new DependencyFactory();

const serviceAccount = require('../service-account.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://web-dev-exam-71d64.firebaseio.com'
})

//When you buy a product. Scroll trough the list and countdown all the diffrent products ordered
export const buyProduct = functions.firestore
  .document('orders/{orderId}')
  .onCreate((snap, context) => {
    return dependencyFactory.getProductController().buyProduct(snap, context);
  });

//Rename one Product will update the Product in all other Documents
export const renameProduct =  functions.firestore
.document('products/{productId}')
.onUpdate((snap,context) =>{
  return dependencyFactory.getProductController().renameProduct(snap,context);
});
