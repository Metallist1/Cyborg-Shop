import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProductState} from '../../shared/product-actions/product.state';
import {Observable, Subscription} from 'rxjs';
import {Product} from '../../shared/entities/product';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {SetSelectedProduct, UpdateExistingProduct, WriteNewProduct} from '../../shared/product-actions/product.action';

@Component({
  selector: 'app-admin-product-edit',
  templateUrl: './admin-product-edit.component.html',
  styleUrls: ['./admin-product-edit.component.css']
})
export class AdminProductEditComponent implements OnInit, OnDestroy {
  @Select(ProductState.getSelectedProduct) selectedProduct: Observable<Product>;
  productForm: FormGroup;
  editProduct = false;

  private formSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.formSubscription.add(
      this.selectedProduct.subscribe(product => {
        if (product) {
          this.productForm.patchValue({
            uid: product.uid,
            name: product.name,
            cost: product.cost,
            inStock: product.inStock,
            estimatedShipping: product.estimatedShipping,
            desc: product.description,
            img: product.img
          });
          this.editProduct = true;
        } else {
          this.editProduct = false;
        }
      })
    );
  }

  createForm() {
    this.productForm = this.fb.group({
      uid: [''] ,
      name: ['', Validators.required],
      cost: ['', Validators.required],
      inStock: ['', Validators.required],
      estimatedShipping: ['', Validators.required],
      desc: ['', Validators.required],
      img: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.editProduct && this.productForm.value.uid !== '' && this.productForm.value.name !== '') {
      this.formSubscription.add(
        this.store.dispatch(new UpdateExistingProduct(this.productForm.value)).subscribe(() => {
          this.clearForm();
        })
      );
    } else if (this.productForm.value.uid !== '' && this.productForm.value.name !== '') {
      const modal = {
        name: this.productForm.value.name,
        cost: this.productForm.value.cost,
        inStock: this.productForm.value.inStock,
        estimatedShipping: this.productForm.value.estimatedShipping,
        description: this.productForm.value.desc,
        img: this.productForm.value.img,
      } as Product;
      this.formSubscription.add(
        this.formSubscription = this.store.dispatch(new WriteNewProduct(modal)).subscribe(() => {
          this.clearForm();
        })
      );
    }
  }

  clearForm() {
    this.productForm.reset();
    this.store.dispatch(new SetSelectedProduct(null));
  }

  ngOnDestroy() {
    return this.formSubscription.unsubscribe;
  }
}
