import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot):boolean{
    console.log("In guard Service");
    if(localStorage.getItem("token") === undefined || localStorage.getItem("token") === null || localStorage.getItem("token")===""){
      this.router.navigate(['/login']);
      return false
    }else{
      return true
    }
  }
}
