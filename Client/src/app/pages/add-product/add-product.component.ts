import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {


  categoryList :Category[] = []

  selectedFile!: File | null;

  constructor(private categoryService:CategoryService,private productService :ProductService){}
  form:any = {
      name:null,
      brand:null,
      price:null,
      corrency:null,
      category:null,
      description:null,
      filename:null
  }
  ngOnInit(): void {
    this.loadAllCategories()
  }
  selectFiles(event: any): void {
    this.selectedFile = event.target.files[0];
  }
  onSubmit(){

    this.productService.setProduct(this.form,this.selectedFile).subscribe((res:any)=>{
      if(res.status == "success"){
    //   this.form = {
    //     name:null,
    //     brand:null,
    //     price:null,
    //     corrency:null,
    //     category:null,
    //     description:null,
    //     filename:null
    // }
    // this.selectedFile = new File([],'',)
    this.reloadPage()
  }
    })
    console.log(this.form)


  }
  loadAllCategories(){
    this.categoryService.getAllProducts().subscribe((result:any)=>{
    this.categoryList = result.data.category
    })
    }
    reloadPage(): void {
      window.location.reload();
    }
}
