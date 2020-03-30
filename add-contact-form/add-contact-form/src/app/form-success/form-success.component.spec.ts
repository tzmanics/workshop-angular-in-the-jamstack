import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSuccessComponent } from './form-success.component';

describe('FormSuccessComponent', () => {
  let component: FormSuccessComponent;
  let fixture: ComponentFixture<FormSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
