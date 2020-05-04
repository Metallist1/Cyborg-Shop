import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../shared/product-actions/product.state';
import {Observable} from 'rxjs';
import {Product} from '../../shared/entities/product';
import {DeleteProduct, ReadProducts, SetSelectedProduct} from '../../shared/product-actions/product.action';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Select(ProductState.getALLProduct) Products: Observable<Product[]>;
  page = 0;
  tablename = 'products';
  isFinished = false;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new ReadProducts(this.tablename, 'default' ));
  }

  next() {
    this.page++;
    this.store.dispatch(new ReadProducts(this.tablename, 'next'));
    this.Products.subscribe(data => {
      if (data.length < 4) {
        this.isFinished = true;
      }
    });
  }

  before() {
    if (this.page > 0) {
      this.page--;
      this.store.dispatch(new ReadProducts(this.tablename, 'back'));
      this.isFinished = false;
    }
  }
}
