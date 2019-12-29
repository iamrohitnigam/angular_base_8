import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreementEditComponent } from './agreement-edit.component';

describe('AgreementEditComponent', () => {
  let component: AgreementEditComponent;
  let fixture: ComponentFixture<AgreementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
