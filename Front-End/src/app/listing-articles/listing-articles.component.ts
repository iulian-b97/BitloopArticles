import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-listing-articles',
  templateUrl: './listing-articles.component.html',
  styleUrls: ['./listing-articles.component.css']
})
export class ListingArticlesComponent implements OnInit {

  sectionBool:boolean = false;
  sectionBool2:boolean = false;
  sectionBool3:boolean = false;
  showPagination:boolean = true;

  getArticleId:any;
  article:any;
  searchArticles:any;
  currentPage:number = 1;
  totalPages:any;
  pagination:any;
  allArticlesPagination:any;


  constructor(public articleService: ArticleService, public categoryService: CategoryService, public router: Router) { }

  ngOnInit(): void {
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

  section3On(articleId:any) {
    this.sectionBool3 = true;
    this.getArticleId = articleId;
    this.articleService.getArticle(this.getArticleId).subscribe((res:any) => {
      this.article = res;
      console.log(this.getArticleId);
      console.log(this.article);
    });
  }

  section2On(articleId:any) {
    this.sectionBool2 = true;
    this.getArticleId = articleId;
    //this.articleService.setForm(articleId);
    this.articleService.getArticle(this.getArticleId).subscribe((res:any) => {
      this.article = res;
      console.log(this.getArticleId);
      console.log(this.article);
    });
  }

  deleteArticle(articleId:any) {
    this.articleService.deleteArticle(articleId).subscribe((res:any) => {
      console.log(res);
    });
    window.location.reload();
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

  searchArticle(title:string, introduction:string, description:string) {
    this.articleService.searchArticle(title, introduction, description).subscribe((res:any) => {
      this.allArticlesPagination = res;
      console.log(this.allArticlesPagination);
    });

    this.showPagination = false;
  }

  sectionOn() {
    this.sectionBool = true;
  }
}
