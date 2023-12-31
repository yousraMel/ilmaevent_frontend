import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBenefitPopupComponent } from './add-benefit-popup.component';

describe('AddBenefitPopupComponent', () => {
  let component: AddBenefitPopupComponent;
  let fixture: ComponentFixture<AddBenefitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBenefitPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBenefitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
