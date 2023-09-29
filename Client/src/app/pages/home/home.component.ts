import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductSharing } from 'src/app/services/product-sharing.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  pageCount = 5

  totalProductCount = 0

  pageLimit = 10

  pageNow:number = 1

  categoryLabel = "Categories" 

  brandLabel = "Brand"

  Brands :String []=[]

  productList :Product[] = []

  categoryList : Category[] = []

  router: Router = inject(Router);

  constructor(private productService: ProductService
    ,private categoryService:CategoryService ,
    private productSharing:ProductSharing
    ){}

  ngOnInit(): void {
    this.loadAllProducts()
    this.loadAllCategories()
    this.getAllBrands()
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe((result: any)=>{
      this.totalProductCount = result.totalLength 
      this.setPageCount()
      this.productList = result.data.product;
    })
  }

  loadAllCategories(){
  this.categoryService.getAllProducts().subscribe((result:any)=>{

    this.categoryList = result.data.category
  })
  }

  getRange(length: number): number[] {
    return Array.from({ length }, (_, index) => index + 1);
  }

  getProductImage(id:Number){
    return this.productService.imageUrl + id
  }


  getProductByCategory(category:Category){
    this.pageNow = 1
    this.productService.getProductsByCategory(category).subscribe((result:any)=>{ 
      this.totalProductCount = result.totalLength 
      this.setPageCount()
      this.productList = result.data.product;
      this.categoryLabel=category.name +""
    })
  }
setPageCount(){
  let lastPageProductCount = this.totalProductCount % this.pageLimit 
  this.pageCount = (lastPageProductCount>0)?
   ((this.totalProductCount - lastPageProductCount) / this.pageLimit ) + 1 
  : ((this.totalProductCount - lastPageProductCount) / this.pageLimit )  
}

  getAllBrands(){
    this.Brands.push("All")
    this.productService.getAllCategoryBrand().subscribe((result:any)=>{
      
      for(let x = 0 ; x < result.data.product.length ; x++){
        if(!this.Brands.includes(result.data.product[x].brand))
        this.Brands.push(result.data.product[x].brand)
      }
    })
  } 

  getProductByBrand(brand:String){
    this.pageNow = 1
    this.productService.getProductByBrand(brand).subscribe((result:any)=>{
      this.totalProductCount = result.totalLength 
      this.setPageCount()
      this.productList = result.data.product;
      this.brandLabel=brand +""
    })
  }
  SortBy(Operation:String){
    this.pageNow = 1
    this.productService.getProductSotedByPrice(Operation).subscribe((result:any)=>{
      this.totalProductCount = result.totalLength 
      this.setPageCount()
      this.productList = result.data.product;
    })
  }
  getPage(page:number){
    this.pageNow = page
    this.productService.getPage(page).subscribe((result:any)=>{
      
      this.totalProductCount = result.totalLength 
      this.setPageCount()
      this.productList = result.data.product;
    })

  }
  sendProduct(product:any){
    this.productSharing.setData(product)
    this.router.navigate(['\product']);
  }
  Number(Num:Number) {
      return Num.valueOf()
  }
}
