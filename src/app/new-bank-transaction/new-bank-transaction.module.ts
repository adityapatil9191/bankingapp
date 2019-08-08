import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NewBankTransactionComponent } from './new-bank-transaction/new-bank-transaction.component';

@NgModule({
  declarations: [NewBankTransactionComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers:[DatePipe]
})
export class NewBankTransactionModule { }
