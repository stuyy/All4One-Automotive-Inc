import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitsFormDialogComponent } from './profits-form-dialog.component';

describe('ProfitsFormDialogComponent', () => {
  let component: ProfitsFormDialogComponent;
  let fixture: ComponentFixture<ProfitsFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitsFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
