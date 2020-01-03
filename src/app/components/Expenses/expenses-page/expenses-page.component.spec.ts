import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesPageComponent } from './expenses-page.component';

describe('ExpensesPageComponent', () => {
  let component: ExpensesPageComponent;
  let fixture: ComponentFixture<ExpensesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
