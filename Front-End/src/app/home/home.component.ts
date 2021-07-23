import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
  countArticlesByCt:any;
  allCategories:any;
  nr:any;
  allArticles:any;
  getArticleId:any;
  allArticlesPagination:any;
  searchArticles:any;
  currentPage:number = 1;
  totalPages:any;
  pagination:any;

  show:boolean = false;
  showPagination:boolean = true;
  editBool:boolean = false;
  deleteBool:boolean = false;
  sectionBool:boolean = false;
  sectionBool2:boolean = false;
  sectionBool3:boolean = false;
  editCategoryName:boolean = false;

  constructor(public categoryService: CategoryService, public articleService: ArticleService,
                     public fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (res:any) => {
        this.allCategories = res;
        console.log(this.allCategories);
      }
    );
    this.articleService.getArticlePaginationList(1, 5).subscribe((res:any) => {
      this.pagination = res;
      console.log(this.pagination);
      this.allArticlesPagination = Object.values(this.pagination)[1];
      console.log(this.allArticlesPagination);
    });
    this.articleService.getTotalPages().subscribe((res:any) => {
      this.totalPages = res;
      console.log(this.totalPages);
    });
  }
  
  showOn() {
    this.show = true;
    this.categoryService.categoryModel.reset();
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
    
    this.deleteBool = true;
    this.getCategoryId = categoryId;

    this.categoryService.countArticlesByCategory(categoryId).subscribe(res => {
      this.nr = res;
      console.log(this.nr);
    });
  } 

  confirmDelete(categoryId:any) {
    if(this.nr === 0)
    {
      window.location.reload();
      this.categoryService.deleteCategory(categoryId).subscribe((res:any) => {
        console.log(res);
      });
    }
    else
    {
      this.toastr.error('The Category cannot be deleted because there are Articles that use it');
    }
  }

  deleteOff() {
    this.deleteBool = false;
  }

  editOn(categoryId:any) {
    this.editBool = true;
    this.getCategoryId = categoryId;
  }

  editOff() {
    this.editBool = false;
    this.categoryService.categoryModel.reset();
  }

  editCategory(categoryId:any) {
    this.categoryService.editCategory(categoryId).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
    });

    this.categoryService.categoryModel.reset();

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

    this.showPagination = false;
  }
}


