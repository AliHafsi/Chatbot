import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuComponent } from './reu.component';

describe('ReuComponent', () => {
  let component: ReuComponent;
  let fixture: ComponentFixture<ReuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
