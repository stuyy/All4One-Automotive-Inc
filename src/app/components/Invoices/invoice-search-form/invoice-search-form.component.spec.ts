import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSearchFormComponent } from './invoice-search-form.component';

describe('InvoiceSearchFormComponent', () => {
  let component: InvoiceSearchFormComponent;
  let fixture: ComponentFixture<InvoiceSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
