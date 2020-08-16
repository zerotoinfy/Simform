import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../service/api.service';
import { FormGroup, FormBuilder, Validators  } from "@angular/forms";


@Component({
  selector: 'app-product-grid-list',
  templateUrl: './product-grid-list.component.html',
  styleUrls: ['./product-grid-list.component.css']
})
export class ProductGridListComponent implements OnInit {

  

  Product:any = [];
  pageOfItems: Array<any>;

  constructor(private apiService: ApiService) { 
    this.apiService.setLoggedIn(true);
    this.readProducts();
  }

  readProducts(){
    this.apiService.getProducts().subscribe((data) => {
     this.Product = data;
    })    
  }

  removeProduct(product, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteProduct(product._id).subscribe((data) => {
          this.Product.splice(index, 1);
        }
      )    
    }
  }

  ngOnInit() {
    
}

onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

} 
