import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  category:any;
  getCategoryId:any;
  allCategories:any;
  allArticles:any;
  getArticleId:any;
  allArticlesPagination:any;
  searchArticles:any;
  currentPage:number = 1;
  totalPages:any;
  pagination:any;

  show:boolean = false;
  editBool:boolean = false;
  sectionBool:boolean = false;
  sectionBool2:boolean = false;
  sectionBool3:boolean = false;
  editCategoryName:boolean = false;

  constructor(public categoryService: CategoryService, public articleService: ArticleService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (res:any) => {
        this.allCategories = res;
        console.log(this.allCategories);
      }
    );
    this.articleService.getAllArticles().subscribe((res:any) => {
      this.allArticles = res;
      console.log(this.allArticles);
    });
    this.articleService.getTotalPages().subscribe((res:any) => {
      this.totalPages = res;
      console.log(this.totalPages);
    });
  }
  
  showOn() {
    this.show = true;
  }

  showOff() {
    this.show = false;
  }

  addNewCategory() {
    this.categoryService.addCategory().subscribe(
      (res:any) => {
        this.allCategories = res;
        this.show = false;
        console.log(this.allCategories)
      }
    );

    this.categoryService.getAllCategories().subscribe(
      (res:any) => {
        this.allCategories = res;
        console.log(this.allCategories);
      }
    );
  }

  deleteCategory(categoryId:any) {
    window.location.reload();
    this.categoryService.deleteCategory(categoryId).subscribe((res) => {
      console.log(res);
    });
  }

  editOn(categoryId:any) {
    this.editBool = true;
    this.getCategoryId = categoryId;
  }

  editOff() {
    this.editBool = false;
  }

  editCategory(categoryId:any) {
    this.categoryService.editCategory(categoryId).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
    });

    this.editBool = false;
  }

  sectionOn() {
    this.sectionBool = true;
  }

  sectionOff() {
    this.sectionBool = false;
  }

  previousArticlePaginationList(currentPage:any, pageSize:any) {
    this.articleService.getArticlePaginationList(currentPage, pageSize).subscribe((res:any) => {
      this.pagination = res;
      console.log(this.pagination);
      this.allArticlesPagination = Object.values(this.pagination)[1];
      console.log(this.allArticlesPagination);
    });

      --this.currentPage;
    console.log(this.currentPage);
  }

  selectArticlePaginationList(currentPage:any, pageSize:any) {
    this.articleService.getArticlePaginationList(currentPage, pageSize).subscribe((res:any) => {
      this.pagination = res;
      console.log(this.pagination);
      this.allArticlesPagination = Object.values(this.pagination)[1];
      console.log(this.allArticlesPagination);
    });

    this.currentPage = currentPage;
    console.log(this.currentPage);
  }

  nextArticlePaginationList(currentPage:any, pageSize:any) {
    this.articleService.getArticlePaginationList(currentPage, pageSize).subscribe((res:any) => {
      this.pagination = res;
      console.log(this.pagination);
      this.allArticlesPagination = Object.values(this.pagination)[1];
      console.log(this.allArticlesPagination);
    });

    ++this.currentPage;
    console.log(this.currentPage);
  }

  counter() {
    return new Array(this.totalPages);
  }

  deleteArticle(articleId:any) {
    this.articleService.deleteArticle(articleId).subscribe((res:any) => {
      console.log(res);
    });
    window.location.reload();
  }

  editArticle(articleId:any) {
    this.articleService.editArticle(articleId).subscribe((res:any) =>{
      console.log(res);
      window.location.reload();
    });
  }

  section2On(articleId:any) {
    this.sectionBool2 = true;
    this.getArticleId = articleId;
    //this.articleService.setForm(articleId);
  }

  section2Off() {
    this.sectionBool2 = false;
  }

  section3On(articleId:any) {
    this.sectionBool3 = true;
    this.getArticleId = articleId;
  }

  section3Off() {
    this.sectionBool3 = false;
  }

  searchArticle(title:string, introduction:string, description:string) {
    this.articleService.searchArticle(title, introduction, description).subscribe((res:any) => {
      this.allArticlesPagination = res;
      console.log(this.allArticlesPagination);
    });
  }
}


