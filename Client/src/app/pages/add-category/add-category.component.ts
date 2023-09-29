import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit{
  constructor(private categoryService:CategoryService){}
  ngOnInit(): void {
   
  }
  form:any = {
      name:null,
      description:null
  }

  onSubmit(){
    console.log(this.form)
    this.categoryService.setCategory(this.form).subscribe((res:any)=>{
      if(res.status == "success")
      this.form = {      name:null,
        description:null}
    })


  }
}
