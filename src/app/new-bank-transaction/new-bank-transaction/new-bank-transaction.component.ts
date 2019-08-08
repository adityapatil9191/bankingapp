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
    this.getJsonResponse();
    this.referenceNumber = this.generateReferenceNumber();
  }

  
  onChanges(data){
    this.paymentsForm.valueChanges.subscribe(
      val=>{
        let customerInformation = data.responseXML.getCustomerInfoResponse.getCustomerInfoResult.CUST_INFO;
        if(val.custNumber === customerInformation.CUST_NO){
          this.customerAddress = customerInformation.STREET_ADDR +" "+ customerInformation.ADDRESS_LINE2+" "+customerInformation.ADDRESS_LINE3+" "+customerInformation.TOWN_COUNTRY;
          this.customerName = customerInformation.SHORT_NAME;
          this.customerPhone = customerInformation.CONTACT_INFO_V7.CONTACT_INFO_V7.PHONE_LIST_V7.PHONE_LIST_ITEM_V7.PHONE;
        }
      }
    )
  }

  generateReferenceNumber(){
    let fourRandomDigitNumber = Math.floor(1000 + Math.random() * 9000);
    let date = new Date();
    let dateString = this.datePipe.transform(date, 'yyyyMMdd');
    let referenceString = "CUS"+ dateString + fourRandomDigitNumber;
    return referenceString;
  }

  getJsonResponse(){
    return this.appCommonService.getJson().subscribe(
      (data)=>{
        this.onChanges(data);
      }
    )
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
          console.log(obj);
          alert("Payments Successful");
        }
      },
      (error)=>{
        alert("Transaction Unsuccessful Please Call 809898")
      }
    )
  }

}
