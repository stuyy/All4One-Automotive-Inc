import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListingDialogComponent } from './job-listing-dialog.component';

describe('JobListingDialogComponent', () => {
  let component: JobListingDialogComponent;
  let fixture: ComponentFixture<JobListingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobListingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
