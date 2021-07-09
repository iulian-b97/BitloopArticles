import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  category:any;
  show:boolean = false;

  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
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
        this.category = res;
        this.show = false;
        console.log(this.category)
      }
    );
  }
}
