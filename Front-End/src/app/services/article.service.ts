import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  readonly BaseURI = "http://localhost:56514/api";

  articleModel = this.fb.group({
    Title :[''],
    Introduction :[''],
    Description :[''],
    CategoryName :['']
  });

  addArticle() {
    var body = {
      Title: this.articleModel.value.Title,
      Introduction: this.articleModel.value.Introduction,
      Description: this.articleModel.value.Description,
      CategoryName: this.articleModel.value.CategoryName
    }

    this.articleModel.reset();
    this.router.navigateByUrl('/home');

    return this.http.post(this.BaseURI+'/Article/AddArticle', body);
  }

  getAllArticles() : any {
    return this.http.get(this.BaseURI+'/Article/GetAllArticles');
  }

  deleteArticle(articleId:any) {
    const params = new HttpParams()
      .set('articleId', articleId)

    return this.http.delete(this.BaseURI+'/Article/DeleteArticle', {params});
  }

  editArticle(articleId:any) {
    var body = {
      Title: this.articleModel.value.Title,
      Introduction: this.articleModel.value.Introduction,
      Description: this.articleModel.value.Description,
      CategoryName: this.articleModel.value.CategoryName
    }

    const params = new HttpParams()
      .set('articleId', articleId)

    return this.http.put(this.BaseURI+'/Article/EditArticle',body, {params});
  }
}
