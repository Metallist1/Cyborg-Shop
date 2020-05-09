import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../shared/product-actions/product.state';
import {Observable} from 'rxjs';
import {Product} from '../../shared/entities/product';
import {AuUser} from '../../auth/entities/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-single-product-view',
  templateUrl: './single-product-view.component.html',
  styleUrls: ['./single-product-view.component.css']
})
export class SingleProductViewComponent implements OnInit {
  @Select(ProductState.getSelectedProduct) Product: Observable<Product>;
  currentP: Product;

  ngOnInit(): void {
  }

  constructor(
    private router: Router,
    private store: Store
  ) {

    this.Product.subscribe(
      (data) => {
        this.currentP = data;
      });
  }

}
