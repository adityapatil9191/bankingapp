import { Component, OnInit } from '@angular/core';
import { AppCommonService } from 'src/app/app-common.service';

@Component({
  selector: 'app-view-bank-transactions',
  templateUrl: './view-bank-transactions.component.html',
  styleUrls: ['./view-bank-transactions.component.css']
})
export class ViewBankTransactionsComponent implements OnInit {

  constructor(public appCommonService:AppCommonService) { }
  public paymentDetailsArray:any=[];
  ngOnInit() {
    // console.log(this.appCommonService.getPaymentDetailsArray())
    // this.CountryService.GetCountries()
    // .subscribe(countries => {
    //     this.myGridOptions.rowData = countries as CountryData[]
    // })
    this.appCommonService.getPaymentDetailsArray().subscribe(
      (data:any)=>{
        this.paymentDetailsArray = data;
        console.log(data);
      },
      (error)=>{
        alert("Some error occured")
      }
    );
    console.log(this.paymentDetailsArray);
    
  }

}
