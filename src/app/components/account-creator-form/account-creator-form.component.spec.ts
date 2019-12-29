import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreatorFormComponent } from './account-creator-form.component';

describe('AccountCreatorFormComponent', () => {
  let component: AccountCreatorFormComponent;
  let fixture: ComponentFixture<AccountCreatorFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreatorFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
