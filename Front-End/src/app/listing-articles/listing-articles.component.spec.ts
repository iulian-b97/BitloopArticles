import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingArticlesComponent } from './listing-articles.component';

describe('ListingArticlesComponent', () => {
  let component: ListingArticlesComponent;
  let fixture: ComponentFixture<ListingArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingArticlesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
