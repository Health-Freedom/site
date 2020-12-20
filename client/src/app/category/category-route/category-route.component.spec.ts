import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryRouteComponent } from './category-route.component';

describe('CategoryRouteComponent', () => {
  let component: CategoryRouteComponent;
  let fixture: ComponentFixture<CategoryRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryRouteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
