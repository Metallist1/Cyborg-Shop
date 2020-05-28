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
  tableName = 'products';
  isFinished = false;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new ReadProducts(this.tableName, 10, 'name', 'desc', 'default' ));
  }

  next() {
    this.page++;
    this.store.dispatch(new ReadProducts(this.tableName, 10, 'name', 'desc', 'next' ));
    this.Products.subscribe(data => {
      if (data.length < 10) {
        this.isFinished = true;
      }
    });
  }

  before() {
    if (this.page > 0) {
      this.page--;
      this.store.dispatch(new ReadProducts(this.tableName, 10, 'name', 'desc', 'back' ));
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
