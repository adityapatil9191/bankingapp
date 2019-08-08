import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppCommonService } from 'src/app/app-common.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public appCommonService:AppCommonService,public router:Router) { }
  public authUserFlag=0;

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required]),
      password:new FormControl('',[Validators.required]),
    });
    
  }

  onSubmit=()=>{
    this.appCommonService.validateUser().subscribe(
      (data)=>{
        for(var i in data){
          if(this.loginForm.controls.email.value === data[i].email && this.loginForm.controls.password.value === data[i].password){
            localStorage.setItem("token",data[i].token);
            this.router.navigate(['/home']);
            this.authUserFlag = 1;
          } 
        }
        if(this.authUserFlag === 0){
          alert("Please enter valid credentials");
        }
      },
      (error)=>{
        alert("Something went Wrong !!"+error)
      }
    )
   
  }

}
