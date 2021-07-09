import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  readonly BaseURI = "http://localhost:56514/api";

  categoryModel = this.fb.group({
    Name :['']
  });

  addCategory() : any
  {
    var body = {
      Name: this.categoryModel.value.Name
    }

    this.categoryModel.reset();

    return this.http.post(this.BaseURI+'/Category/AddCategory', body);
  }

  getAllCategories() : any
  {
    return this.http.get(this.BaseURI+'/Category/GetAllCategories');
  }
}
