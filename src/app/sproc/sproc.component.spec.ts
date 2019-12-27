import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SprocComponent } from './sproc.component';

describe('SprocComponent', () => {
  let component: SprocComponent;
  let fixture: ComponentFixture<SprocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SprocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SprocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
