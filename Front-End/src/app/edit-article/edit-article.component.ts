import { Component, OnInit, Input  } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  
  allCategories:any;
  
  editCategoryName:boolean = false;
  sectionBool2:boolean = false;

  @Input() article:any; 

  constructor(public articleService: ArticleService, public categoryService: CategoryService, public router: Router) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (res:any) => {
        this.allCategories = res;
        console.log(this.allCategories);
      }
    );
  }

  section2Off() {
    this.sectionBool2 = false;
  }

  editArticle(articleId:any) {
    this.articleService.editArticle(articleId).subscribe((res:any) =>{
      console.log(res);
      window.location.reload();
    });
  }
}
