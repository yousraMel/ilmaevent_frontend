import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBenefitComponent } from './admin-benefit.component';

describe('AdminBenefitComponent', () => {
  let component: AdminBenefitComponent;
  let fixture: ComponentFixture<AdminBenefitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminBenefitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
