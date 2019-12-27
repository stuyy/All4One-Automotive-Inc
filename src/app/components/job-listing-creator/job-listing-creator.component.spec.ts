import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListingCreatorComponent } from './job-listing-creator.component';

describe('JobListingCreatorComponent', () => {
  let component: JobListingCreatorComponent;
  let fixture: ComponentFixture<JobListingCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListingCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListingCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
