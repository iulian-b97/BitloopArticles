import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  allArticles:any;
  allCategories:any;

  constructor(public articleService: ArticleService, public categoryService: CategoryService, public router: Router) { }

  ngOnInit(): void {
    this.articleService.articleModel.reset();
     this.categoryService.getAllCategories().subscribe((res:any) => {
        this.allCategories = res;
        console.log(this.allCategories);
     });
  }

  addNewArticle() {
    this.articleService.addArticle().subscribe((res:any) =>{
      this.allArticles = res;
      console.log(this.allArticles);
      window.location.reload();
    });
  }

  redirectHome() {
    this.router.navigateByUrl('/home');
  }
}
