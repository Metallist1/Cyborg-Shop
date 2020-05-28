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
            img: product.img,
            img2: product.img2,
            img3: product.img3,
            img4: product.img4,
            img5: product.img5,
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
      description: ['', Validators.required],
      img: ['', Validators.required],
      img2: [''] ,
      img3: [''] ,
      img4: [''] ,
      img5: [''] ,
    });
  }

  onSubmit() {
    if (this.editProduct && this.productForm.value.uid !== '' && this.productForm.value.name !== '') {
      this.formSubscription.add(
        this.store.dispatch(new UpdateExistingProduct(this.productForm.value)).subscribe(() => {
          this.clearForm();
        })
      );
    } else if ( this.productForm.value.name !== '') {
      const modal = {
        name: this.productForm.value.name,
        cost: this.productForm.value.cost,
        inStock: this.productForm.value.inStock,
        estimatedShipping: this.productForm.value.estimatedShipping,
        description: this.productForm.value.description,
        img: this.productForm.value.img,
        img2: this.productForm.value.img2,
        img3: this.productForm.value.img3,
        img4: this.productForm.value.img4,
        img5: this.productForm.value.img5,
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
