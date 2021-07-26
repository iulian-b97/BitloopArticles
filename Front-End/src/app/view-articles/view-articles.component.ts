import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-view-articles',
  templateUrl: './view-articles.component.html',
  styleUrls: ['./view-articles.component.css']
})
export class ViewArticlesComponent implements OnInit {

  sectionBool3:boolean = false;

  @Input() article:any; 

  constructor(public articleService: ArticleService, public categoryService: CategoryService, public router: Router) { }

  ngOnInit(): void {
  }

  section3Off() {
    this.sectionBool3 = false;
    window.location.reload();
  }
}
