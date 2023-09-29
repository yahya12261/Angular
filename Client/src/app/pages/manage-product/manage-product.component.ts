import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { CategoryService } from 'src/app/services/category.service';
import { ProductSharing } from 'src/app/services/product-sharing.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.css']
})
export class ManageProductComponent {

  editIndex = -1

  editMode:boolean = false

  priceEditText = ''

  correncyEditText =''

  nameEditText = ''

  constructor(private productService: ProductService
    ,private categoryService:CategoryService ,
    private productSharing:ProductSharing
    ){}

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

  getRange(length: number): number[] {
    return Array.from({ length }, (_, index) => index + 1);
  }

setPageCount(){
  let lastPageProductCount = this.totalProductCount % this.pageLimit 
  this.pageCount = (lastPageProductCount>0)?
   ((this.totalProductCount - lastPageProductCount) / this.pageLimit ) + 1 
  : ((this.totalProductCount - lastPageProductCount) / this.pageLimit )  
}
  getPage(page:number){
    this.pageNow = page
    this.productService.getPageToMange(page).subscribe((result:any)=>{
      
      this.totalProductCount = result.totalLength 
      this.setPageCount()
      this.productList = result.data.product;
    })

  }

  ngOnInit(): void {
    this.loadAllProducts()
  }

  loadAllProducts() {
    this.productService.getAllProductsToManage().subscribe((result: any)=>{
      this.totalProductCount = result.totalLength 
      this.setPageCount()
      this.productList = result.data.product;
    })
  }
  setVisible(id:Number,visible:number){ 
  this.productService.setVisible(id,visible).subscribe((result: any)=>{
    if(result.status = "success"){
      this.getPage(this.pageNow)
    }
  })
}
  enterEditMode(product:Product,index:number){
    this.editIndex = index
    this.priceEditText = product.price.value +"" 
    this.correncyEditText = product.price.currency +""
    this.nameEditText = product.name+""
  }
  saveEdit(product:Product){
    this.editMode = false
    this.editIndex = -1
    this.productService.editProduct(Number(product.productId) , this.nameEditText +"", Number(this.priceEditText) , this.correncyEditText +"").subscribe((res:any)=>{
      if(res.status = "success"){
        this.getPage(this.pageNow)
      }else{
        alert(`${res.status}`)
      }
    })

    }

    deleteProduct(id:Number){
      this.productService.deleteProduct(id).subscribe((res:any)=>{
      this.getPage(this.pageNow)
      })
    }


}
