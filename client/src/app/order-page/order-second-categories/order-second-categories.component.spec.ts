import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSecondCategoriesComponent } from './order-second-categories.component';

describe('OrderSecondCategoriesComponent', () => {
  let component: OrderSecondCategoriesComponent;
  let fixture: ComponentFixture<OrderSecondCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSecondCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSecondCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
