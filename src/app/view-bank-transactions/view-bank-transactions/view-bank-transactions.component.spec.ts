import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBankTransactionsComponent } from './view-bank-transactions.component';

describe('ViewBankTransactionsComponent', () => {
  let component: ViewBankTransactionsComponent;
  let fixture: ComponentFixture<ViewBankTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBankTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBankTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
