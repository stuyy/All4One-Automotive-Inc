import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpensesFormDialogComponent } from './expenses-form-dialog.component';

describe('ExpensesFormDialogComponent', () => {
  let component: ExpensesFormDialogComponent;
  let fixture: ComponentFixture<ExpensesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpensesFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpensesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
