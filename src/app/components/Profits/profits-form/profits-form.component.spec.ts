import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitsFormComponent } from './profits-form.component';

describe('ProfitsFormComponent', () => {
  let component: ProfitsFormComponent;
  let fixture: ComponentFixture<ProfitsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
