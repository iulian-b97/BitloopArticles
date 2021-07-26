import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-listing-categories',
  templateUrl: './listing-categories.component.html',
  styleUrls: ['./listing-categories.component.css']
})
export class ListingCategoriesComponent implements OnInit {

  allCategories:any;
  getCategoryId:any;
  nr:any;

  deleteBool:boolean = false;
  show:boolean = false;
  editBool:boolean = false;

  constructor(public categoryService: CategoryService, public articleService: ArticleService,
    public fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (res:any) => {
        this.allCategories = res;
        console.log(this.allCategories);
      }
    );
  }

  editOn(categoryId:any) {
    this.editBool = true;
    this.getCategoryId = categoryId;
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

  editCategory(categoryId:any) {
    this.categoryService.editCategory(categoryId).subscribe((res) => {
      console.log(res);
      this.ngOnInit();
    });

    this.categoryService.categoryModel.reset();

    this.editBool = false;
  }

  editOff() {
    this.editBool = false;
    this.categoryService.categoryModel.reset();
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

}
