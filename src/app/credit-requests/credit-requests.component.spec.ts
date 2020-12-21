import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditRequestsComponent } from './credit-requests.component';

describe('CreditRequestsComponent', () => {
  let component: CreditRequestsComponent;
  let fixture: ComponentFixture<CreditRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
