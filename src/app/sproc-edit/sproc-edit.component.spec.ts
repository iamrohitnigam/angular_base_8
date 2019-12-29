import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprocEditComponent } from './sproc-edit.component';

describe('SprocEditComponent', () => {
  let component: SprocEditComponent;
  let fixture: ComponentFixture<SprocEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprocEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprocEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
