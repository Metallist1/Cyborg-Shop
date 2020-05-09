import {Change, EventContext} from 'firebase-functions';
import { DocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { Product } from "../models/product";
import {Order} from '../models/order';

export class ProductControllerFirebase implements ProductController {
  constructor(private productService: ProductService) {}

  buyProduct(snap: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>, context: EventContext): Promise<void> {
    const order = snap.data() as Order;
    return this.productService.buyProduct(context.params.orderId,order);
  }

  renameProduct(snap: Change<DocumentSnapshot>, context: EventContext): Promise<void> {

    const beforeP = snap.before.data() as Product;
    const afterP = snap.after.data() as Product;

    return this.productService.renameProduct(context.params.productId, beforeP,afterP);
  }
}
