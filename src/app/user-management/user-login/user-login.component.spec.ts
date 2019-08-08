import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginComponent } from './user-login.component';
import { AppCommonService } from 'src/app/app-common.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

describe('UserLoginComponent', () => {
  let component: UserLoginComponent;
  let fixture: ComponentFixture<UserLoginComponent>;
  let appCommonService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginComponent ],
      imports: [HttpClientModule],
      providers: [AppCommonService,Router],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
  it("should check for valid credentials", async(() => {
    let response={};
  
    spyOn(appCommonService, 'validateUser').and.returnValue(of(response))
  
    component.onSubmit();
  
    fixture.detectChanges();
  
    expect(component.authUserFlag).toEqual(0);
  }));
});
