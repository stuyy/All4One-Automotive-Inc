import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTempComponent } from './home-temp.component';

describe('HomeComponent', () => {
  let component: HomeTempComponent;
  let fixture: ComponentFixture<HomeTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
