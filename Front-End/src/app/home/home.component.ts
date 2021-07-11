import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  category:any;
  allCategories:any;
  allArticles:any;
  show:boolean = false;
  editBool:boolean = false;
  sectionBool:boolean = false;
  sectionBool2:boolean = false;
  sectionBool3:boolean = false;

  constructor(public categoryService: CategoryService, public articleService: ArticleService) { }

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

  editOn() {
    this.editBool = true;
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

  section2On() {
    this.sectionBool2 = true;
  }

  section2Off() {
    this.sectionBool2 = false;
  }

  section3On() {
    this.sectionBool3 = true;
  }

  section3Off() {
    this.sectionBool3 = false;
  }
}


