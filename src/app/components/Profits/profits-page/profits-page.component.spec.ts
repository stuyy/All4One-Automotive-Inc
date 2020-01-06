import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitsPageComponent } from './profits-page.component';

describe('ProfitsPageComponent', () => {
  let component: ProfitsPageComponent;
  let fixture: ComponentFixture<ProfitsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
