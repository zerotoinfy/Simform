import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent implements OnInit {
  submitted = false;
  productForm: FormGroup;
  Categories: any = ['Electronics', 'Appliances', 'Parts & Accessories', 'Beauty & Personal Care', 'Clothing, Shoes and Jewelry', 'Luggage & Travel Gear', 'Musical Instruments', 'Sports & Outdoors', 'Toys & Games']
  url;
  msg = "";
  actual_price: number;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();

  }

  ngOnInit() { }

  mainForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      image: ['', [Validators.required]],
      price: ['', [Validators.required]],
      discount: ['', [Validators.required]],
      netprice: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  updateDiscount(e) {
    console.log("This method is called.",this.productForm.get('price').value);
    const price = this.productForm.get('price').value;
    const  discount = this.productForm.get('discount').value;
    this.actual_price = (parseFloat(discount.toString()) / 100) * parseFloat(price.toString());
    console.log("The calculated actual price is: ", this.actual_price);
    this.productForm.get('netprice').setValue(this.actual_price);
  }

  // Choose designation with select dropdown
  updateProfile(e) {
    this.productForm.get('category').setValue(e, {
      onlySelf: true
    })
  }

  // Getter to access form control
  get myForm() {
    return this.productForm.controls;
  }

  onSubmit() {
    console.log('The values in employee form are : ', this.productForm.value);
    this.submitted = true;
    if (!this.productForm.valid) {
      console.log("The product form is invalid.");
      return false;
    } else {
      this.apiService.createProduct(this.productForm.value).subscribe(
        (res) => {
          console.log('Employee successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/product-list'))
        }, (error) => {
          console.log(error);
        });
    }
  }

  selectFile(event) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.msg = "";
      this.url = reader.result;
    }
  }
}
