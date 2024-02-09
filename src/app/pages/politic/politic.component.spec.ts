import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticComponent } from './politic.component';

describe('PoliticComponent', () => {
  let component: PoliticComponent;
  let fixture: ComponentFixture<PoliticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PoliticComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PoliticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
