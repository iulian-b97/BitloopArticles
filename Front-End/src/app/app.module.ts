import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import { CategoryComponent } from './category/category.component';
import { CategoryService } from './services/category.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ArticleService } from './services/article.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticleComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      progressBar: true
    })
  ],
  providers: [
    CategoryService,
    ArticleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
