import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
export class CategoryService {

  
    public BaseUrl = "http://localhost:3000/api/v1/"

    constructor(private http: HttpClient) { 

    }

    getAllProducts(): Observable<Category[]> {

      return this.http.get<Category[]>(this.BaseUrl + "categories",httpOptions);

    }
    setCategory(form:any):Observable<any[]>{
      let formData = new FormData()
      formData.append('name',form.name)
      formData.append('description',form.description)
      formData.append('icon',"http://www.icon.com")
      
      return this.http.post<any[]>(this.BaseUrl + "categories",formData,httpOptions)
    }

}
