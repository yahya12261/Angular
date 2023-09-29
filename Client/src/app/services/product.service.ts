import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Category } from '../models/category';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  })
    .set('Cache-Control', 'no-cache')
    .set('Pragma', 'no-cache'),
};
@Injectable({
  providedIn: 'root'
})
export class ProductService {


 
  public BaseUrl = "http://localhost:3000/api/v1/"

  public imageUrl = "http://localhost:3000/api/v1/image/"

  private queryString ="?visible=1"

  constructor(private http: HttpClient) { }

getAllProducts(): Observable<Product[]> {
   console.log(this.http.get<Product[]>(this.BaseUrl + "products",httpOptions))
    return this.http.get<Product[]>(this.BaseUrl + "products?limit=10&visible=1",httpOptions);

}
getProductsByCategory(category:Category) :Observable<Product[]> {
  if (this.queryString.includes("?")) {
    const categoryParam = `category=${category.categoryId}`;
    if (this.queryString.includes("&")) {
      if(this.queryString.includes("category")){
        this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
        this.queryString = this.queryString.replace(/category=[^&]*/g, categoryParam);
      }
      else{
        this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
        this.queryString += `&${categoryParam}`;
      }
    } else {
        if(this.queryString.includes("category")){
          this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
          this.queryString = this.queryString.replace(/category=[^&]*/g, categoryParam);
        }
        else{
          this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
          this.queryString += `&${categoryParam}`;
        }
    }
  } else {
    this.queryString = `?category=${category.categoryId}`;
  }
  console.log("category" , this.queryString)

  return this.http.get<Product[]>(this.BaseUrl +`products${this.queryString}`,httpOptions);

}
getAllCategoryBrand(){
  return this.http.get<Product[]>(this.BaseUrl +`products?fields=brand&limit=9999`,httpOptions);
}
getProductByBrand(brand:String) :Observable<Product[]> {
   
  if(brand == "All"){
    this.queryString = this.queryString.replace(/brand=[^&]*/g, "");

    this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
    return this.http.get<Product[]>(this.BaseUrl +`products${this.queryString}`,httpOptions);
    
  }else{
  if (this.queryString.includes("?")) {
    const categoryParam = `brand=${brand}`;
    if (this.queryString.includes("&")) {
      if(this.queryString.includes("brand")){
        this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
        this.queryString = this.queryString.replace(/brand=[^&]*/g, categoryParam);
      }
      else{
        this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
        this.queryString += `&${categoryParam}`;
      }
    } else {
        if(this.queryString.includes("brand")){
          this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
          this.queryString = this.queryString.replace(/brand=[^&]*/g, categoryParam);
        }
        else{
          this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
          this.queryString += `&${categoryParam}`;
        }
    }
  } else {
    this.queryString = `?brand=${brand}`;
  }}
  console.log("Brand" , this.queryString)
  return this.http.get<Product[]>(this.BaseUrl +`products${this.queryString}`,httpOptions);
}
getProductSotedByPrice(orderingOperation : String){
  if (this.queryString.includes("?")) {
    const categoryParam = `sort=${orderingOperation}price.value`;
    if (this.queryString.includes("&")) {
      if(this.queryString.includes("sort")){
        this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
        this.queryString = this.queryString.replace(/sort=[^&]*/g, categoryParam);
      }
      else{
        this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
        this.queryString += `&${categoryParam}`;
      }
    } else {
        if(this.queryString.includes("sort")){
          this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
          this.queryString = this.queryString.replace(/sort=[^&]*/g, categoryParam);
        }
        else{
          this.queryString = this.queryString.replace(/page=[^&]*/g, "page=1");
          this.queryString += `&${categoryParam}`;
        }
    }
  } else {
    this.queryString = `?sort=${orderingOperation}price.value`;
  }
  console.log("sort" , this.queryString)
  return this.http.get<Product[]>(this.BaseUrl +`products${this.queryString}`,httpOptions);
}
getPage(page:Number):Observable<Product[]> {
  if (this.queryString.includes("?")) {
    const categoryParam = `page=${page}`;
    if (this.queryString.includes("&")) {
      if(this.queryString.includes("page")){
        this.queryString = this.queryString.replace(/page=[^&]*/g, categoryParam);
      }
      else{
        this.queryString += `&${categoryParam}`;
      }
    } else {
        if(this.queryString.includes("page")){
          this.queryString = this.queryString.replace(/page=[^&]*/g, categoryParam);
        }
        else{
          this.queryString += `&${categoryParam}`;
        }
    }
  } else {
    this.queryString = `?page=${page}`;
  }
  return this.http.get<Product[]>(this.BaseUrl +`products${this.queryString}`,httpOptions);
}
setProduct(form:any,image:any): Observable<any[]> {

  
  let formData = new FormData()
  formData.append('image',image)
  formData.append('name',form.name)
  formData.append('brand',form.brand)
  formData.append('description',form.description)
  formData.append('price.value',form.price)
  formData.append('inventory.qty',"0")
  formData.append('views','0')
  formData.append('category',form.category)
  formData.append('price.currency',form.corrency)
  return this.http.post<any[]>(this.BaseUrl + "products",formData,httpOptions)

}
getPageToMange(page:Number):Observable<Product[]> {
  return this.http.get<Product[]>(this.BaseUrl +`products?limit=10&page=${page}`,httpOptions);
}
getAllProductsToManage(): Observable<any[]> {
  // console.log(this.http.get<any[]>(this.BaseUrl + "products",httpOptions))
   return this.http.get<any[]>(this.BaseUrl + "products?limit=10",httpOptions);
}
setVisible(id:Number,visible:number) : Observable<any[]>{
return  this.http.patch<any[]>(this.BaseUrl + `products/${id}`,{visible:visible},httpOptions)
}
editProduct(id:Number,name:String,Price : Number,corrency:String ) : Observable<any[]>{
  return  this.http.patch<any[]>(this.BaseUrl + `products/${id}`,{name:name,
    price :{
      value:Price,
      currency:corrency
    }
  },httpOptions)
  }
deleteProduct(id:Number): Observable<any[]>{
  return  this.http.delete<any[]>(this.BaseUrl + `products/${id}`
  ,httpOptions)
}  
}