import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareersApplicationFormComponent } from './careers-application-form.component';

describe('CareersApplicationFormComponent', () => {
  let component: CareersApplicationFormComponent;
  let fixture: ComponentFixture<CareersApplicationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareersApplicationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareersApplicationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
