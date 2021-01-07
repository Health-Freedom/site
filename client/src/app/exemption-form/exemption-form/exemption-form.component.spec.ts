import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExemptionFormComponent } from './exemption-form.component';

describe('ExemptionFormComponent', () => {
  let component: ExemptionFormComponent;
  let fixture: ComponentFixture<ExemptionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExemptionFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExemptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
