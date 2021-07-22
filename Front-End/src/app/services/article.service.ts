import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  readonly BaseURI = "http://localhost:56514/api";

  articleModel = this.fb.group({
    Title :['',Validators.required],
    Introduction :['',Validators.required],
    Description :['',Validators.required],
    CategoryName :['',Validators.required]
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

  getArticle(articleId:any) : any {
    const params = new HttpParams()
      .set('articleId', articleId)

    return this.http.get(this.BaseURI+'/Article/GetArticle', {params});
  }

  getAllArticles() : any {
    return this.http.get(this.BaseURI+'/Article/GetAllArticles');
  }

  getArticlePaginationList(currentPage:any, pageSize:any) : any {
    const params = new HttpParams()
      .set('currentPage', currentPage)
      .set('pageSize', pageSize)

      return this.http.get(this.BaseURI+'/Article/GetArticlePaginationList', {params});
  }

  getTotalPages() : any {
    return this.http.get(this.BaseURI+'/Article/GetTotalPages');
  }

  deleteArticle(articleId:any) {
    const params = new HttpParams()
      .set('articleId', articleId)

    return this.http.delete(this.BaseURI+'/Article/DeleteArticle', {params});
  }

  /*setForm(articleId:any) {
    this.getArticle (articleId).subscribe((data:FormGroup) => this.editForm = data);

       this.articleModel.patchValue({
         Title: this.editForm.value.Title,
         Introduction: this.editForm.value.Introduction,
         Description: this.editForm.value.Description,
         CategoryName: this.editForm.value.CategoryName
        });
  }*/

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

  searchArticle(title:string, introduction:string, description:string) : any
  {
    const params = new HttpParams()
      .set('title', title)
      .set('introduction', introduction)
      .set('description', description)

    return this.http.get(this.BaseURI+'/Article/SearchArticle', {params});
  }
}
