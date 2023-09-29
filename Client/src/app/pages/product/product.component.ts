import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductSharing } from 'src/app/services/product-sharing.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  product!:any

  router: Router = inject(Router);

  constructor(private productSharing : ProductSharing,private productService: ProductService){
    this.product = this.productSharing.getData()
    if(!this.productSharing.getData()){
      this.router.navigateByUrl("/home")
    }
  }
  ngOnInit(): void {
    // if(this.product){
    //   this.router.navigateByUrl("home")
    // }
  }
  getProductImage(id:Number){
    return this.productService.imageUrl + id
  }

  getProduct(){
    
  }
}
