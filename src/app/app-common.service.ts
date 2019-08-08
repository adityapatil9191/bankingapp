import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class AppCommonService {

  public paymentDetailsArray = [];
  public authToken;
  baseUrl = "https://ngdemoapi.getsandbox.com";
  constructor(private http:HttpClient) { }
  public getJson=()=>{
    return this.http.get('/assets/customer.json');
  }

  public savePaymentDetails(object){
    let response = this.http.post(this.baseUrl+'/saveTransaction',object);
    return response;
  }

   public getPaymentDetailsArray=()=>{
    let response = this.http.get(this.baseUrl+'/getSubmitedTransactions');
    return response;
  }
  

  public  validateUser(){
    let response = this.http.get(this.baseUrl + '/login')
    return response;
  }



}
