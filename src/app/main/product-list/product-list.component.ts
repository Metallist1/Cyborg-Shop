import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../shared/product-actions/product.state';
import {Observable} from 'rxjs';
import {Product} from '../../shared/entities/product';
import {DeleteProduct, ReadProducts, SetSelectedProduct} from '../../shared/product-actions/product.action';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Select(ProductState.getALLProduct) Products: Observable<Product[]>;
  @Select(ProductState.getIsFinished) shouldStop: Observable<boolean>;
  page = 1;
  tablename = 'products';
  isFinished = false;
  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    this.store.dispatch(new ReadProducts(this.tablename, 10, 'name', 'dec', 'default' ));
  }

  next() {
    this.page++;
    this.store.dispatch(new ReadProducts(this.tablename, 10, 'name', 'dec', 'next'));
    this.shouldStop.subscribe(data => {
        this.isFinished = data;
      }
    );
  }

  before() {
    if (this.page > 1) {
      this.page--;
      this.store.dispatch(new ReadProducts(this.tablename, 10, 'name', 'dec', 'back'));
    }
    this.shouldStop.subscribe(data => {
        this.isFinished = data;
      }
    );
  }

  showDetails(i: number) {
    this.Products.subscribe(data => {
      this.store.dispatch(new SetSelectedProduct(data[i]));
    });
    this.router.navigate(['/single-product-view']);
  }
}
