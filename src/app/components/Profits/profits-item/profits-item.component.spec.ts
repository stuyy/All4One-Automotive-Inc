import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfitsItemComponent } from './profits-item.component';

describe('ProfitsItemComponent', () => {
  let component: ProfitsItemComponent;
  let fixture: ComponentFixture<ProfitsItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfitsItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfitsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
