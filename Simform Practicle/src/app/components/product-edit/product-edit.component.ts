import { Product } from './../../model/Product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})

export class ProductEditComponent implements OnInit {
  submitted = false;
  editForm: FormGroup;
  employeeData: Product[];
  ProductCategories: any = ['Electronics', 'Appliances', 'Parts & Accessories', 'Beauty & Personal Care', 'Clothing, Shoes and Jewelry', 'Luggage & Travel Gear', 'Musical Instruments', 'Sports & Outdoors', 'Toys & Games']

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateProduct();
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.getProduct(id);
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      netprice: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  // Choose options with select-dropdown
  updateCategory(e) {
    this.editForm.get('category').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.editForm.controls;
  }

  getProduct(id) {
    this.apiService.getProduct(id).subscribe(data => {
      this.editForm.setValue({
        name: data['name'],
        category: data['category'],
        price: data['price'],
        discount: data['discount'],
        netprice: data['netprice'],
        description: data['description'],
      });
    });
  }

  updateProduct() {
    this.editForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      netprice: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.submitted = true;
    if (!this.editForm.valid) {
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.updateProduct(id, this.editForm.value)
          .subscribe(res => {
            this.router.navigateByUrl('/product-list');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}