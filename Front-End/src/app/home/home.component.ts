import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  category:any;
  allCategories:any;
  show:boolean = false;
  editBool:boolean = false;

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe(
      (res:any) => {
        this.allCategories = res;
        console.log(this.allCategories);
      }
    );
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
    this.allCategories.splice(categoryId-1, 1)
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
}


