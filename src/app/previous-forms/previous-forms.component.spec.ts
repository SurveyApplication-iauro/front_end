import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousFormsComponent } from './previous-forms.component';

describe('PreviousFormsComponent', () => {
  let component: PreviousFormsComponent;
  let fixture: ComponentFixture<PreviousFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousFormsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviousFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
