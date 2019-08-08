import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppCommonService } from 'src/app/app-common.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-new-bank-transaction',
  templateUrl: './new-bank-transaction.component.html',
  styleUrls: ['./new-bank-transaction.component.css']
})
export class NewBankTransactionComponent implements OnInit {
  
  paymentsForm: FormGroup;
  
  constructor(public appCommonService:AppCommonService,private formBuilder:FormBuilder,private datePipe:DatePipe) { }
  public customerNumber;
  public customerAddress;
  public customerName;
  public customerPhone;
  public referenceNumber;
 

  ngOnInit() {
    this.paymentsForm = new FormGroup({
      custNumber: new FormControl('',[Validators.required]),
      name:new FormControl('',[Validators.required]),
      address: new FormControl('',[Validators.required]),
      phoneNumber: new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      amount: new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      currency: new FormControl('',[Validators.required]),
      beneficiaryBank: new FormControl('',[Validators.required,Validators.pattern(/[aA-zZ0-9'-]$/)],),
      beneficiaryAccountNumber: new FormControl('',[Validators.required]),
      payDetails: new FormControl('',[Validators.required,Validators.pattern(/[aA-zZ0-9'-]$/)]),
    });
    this.getJsonResponse(this.customerNumber);
    this.referenceNumber = this.generateReferenceNumber();
  }

  
  onChanges(data){
  
   if(data.CUST_INFO!==undefined && data.CUST_INFO.CUST_NO !== undefined){
    this.customerAddress = data.CUST_INFO.STREET_ADDR +" "+ data.CUST_INFO.ADDRESS_LINE2+" "+data.CUST_INFO.ADDRESS_LINE3+" "+data.CUST_INFO.TOWN_COUNTRY;
    this.customerName = data.CUST_INFO.SHORT_NAME;
    this.customerPhone = data.CUST_INFO.CONTACT_INFO_V7.CONTACT_INFO_V7.PHONE_LIST_V7.PHONE_LIST_ITEM_V7.PHONE;
   }
  }

  generateReferenceNumber(){
    let fourRandomDigitNumber = Math.floor(1000 + Math.random() * 9000);
    let date = new Date();
    let dateString = this.datePipe.transform(date, 'yyyyMMdd');
    let referenceString = "CUS"+ dateString + fourRandomDigitNumber;
    return referenceString;
  }

  getJsonResponse(value){
    return this.appCommonService.getJson(value).subscribe(
      (data)=>{
        this.onChanges(data);
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  updateReferenceNumber(){
    let upDatedFourDigitNumber = parseInt(this.referenceNumber.substring(11,))+1;
    this.referenceNumber = this.referenceNumber.substring(0,11)+ upDatedFourDigitNumber;
    return this.referenceNumber;
  }

  onSubmit(){
    let paymenttableobject = {
      reference:this.referenceNumber,
      customer_number:this.paymentsForm.value.custNumber,
      customer_name:this.paymentsForm.value.name,
      transfer_id:"XYZ",
      transfer_amount:this.paymentsForm.value.amount,
      transfer_currency:this.paymentsForm.value.currency,
      beneficiary_bank:this.paymentsForm.value.beneficiaryBank,
      beneficiary_account_number:this.paymentsForm.value.beneficiaryAccountNumber,
      payment_details:this.paymentsForm.value.payDetails
    }
    this.postFormData(paymenttableobject);
    this.paymentsForm.reset();
  }

  postFormData(obj){
    this.appCommonService.savePaymentDetails(obj).subscribe(
      (data:any)=>{
        if(data.status === "success"){
          this.referenceNumber = this.updateReferenceNumber();
          console.log(obj);
          alert("Payment Successful");
        }
      },
      (error)=>{
        alert("Transaction Unsuccessful Please Call 809898")
      }
    )
  }

}
