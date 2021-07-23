import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  readonly BaseURI = "http://localhost:56514/api";

  categoryModel = this.fb.group({
    Name :['',Validators.required]
  });

  addCategory() : any
  {
    var body = {
      Name: this.categoryModel.value.Name
    }

    this.categoryModel.reset();

    return this.http.post(this.BaseURI+'/Category/AddCategory', body);
  }

  getCategory(categoryId:any) {
    const params = new HttpParams()
      .set('categoryId', categoryId)

    return this.http.get(this.BaseURI+'/Category/GetCategory', {params});
  }

  getAllCategories() : any
  {
    return this.http.get(this.BaseURI+'/Category/GetAllCategories');
  }

  countArticlesByCategory(categoryId:any) {
    const params = new HttpParams()
      .set('categoryId', categoryId)

    return this.http.get(this.BaseURI+'/Article/CountArticlesByCategory', {params});
  }

  deleteCategory(categoryId:any) {
    const params = new HttpParams()
      .set('categoryId', categoryId)

    return this.http.delete(this.BaseURI+'/Category/DeleteCategory', {params});
  }

  editCategory(categoryId:any) {
    var body = {
      Name: this.categoryModel.value.Name
    }
    this.categoryModel.reset();

    const params = new HttpParams()
      .set('categoryId', categoryId)

    return this.http.put(this.BaseURI+'/Category/EditCategory',body, {params});
  }
}
