import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingCategoriesComponent } from './listing-categories.component';

describe('ListingCategoriesComponent', () => {
  let component: ListingCategoriesComponent;
  let fixture: ComponentFixture<ListingCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
