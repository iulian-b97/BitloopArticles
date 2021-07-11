import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  allArticles:any;

  constructor(public articleService: ArticleService, public router: Router) { }

  ngOnInit(): void {
     
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
