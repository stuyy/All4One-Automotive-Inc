import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobEditorDialogComponent } from './job-editor-dialog.component';

describe('JobEditorDialogComponent', () => {
  let component: JobEditorDialogComponent;
  let fixture: ComponentFixture<JobEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobEditorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
