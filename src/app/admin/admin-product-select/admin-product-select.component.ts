import { Component, OnInit } from '@angular/core';
import {DeleteProduct, ReadProducts, SetSelectedProduct} from '../../shared/product-actions/product.action';
import {Product} from '../../shared/entities/product';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../shared/product-actions/product.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-admin-product-select',
  templateUrl: './admin-product-select.component.html',
  styleUrls: ['./admin-product-select.component.css']
})
export class AdminProductSelectComponent implements OnInit {

  @Select(ProductState.getALLProduct) Products: Observable<Product[]>;
  page = 0;
  tablename = 'products';
  isFinished = false;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new ReadProducts(this.tablename, 10, 'name', 'dec', 'default' ));
  }

  next() {
    this.page++;
    this.store.dispatch(new ReadProducts(this.tablename, 10, 'name', 'dec', 'next' ));
    this.Products.subscribe(data => {
      if (data.length < 4) {
        this.isFinished = true;
      }
    });
  }

  before() {
    if (this.page > 0) {
      this.page--;
      this.store.dispatch(new ReadProducts(this.tablename, 10, 'name', 'dec', 'back' ));
      this.isFinished = false;
    }
  }


  deleteProduct(uid: string) {
    this.store.dispatch(new DeleteProduct(uid));
  }
  editTodo(payload: Product) {
    this.store.dispatch(new SetSelectedProduct(payload));
  }
}
