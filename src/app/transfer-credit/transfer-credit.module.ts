import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferCreditRoutingModule } from './transfer-credit-routing.module';
import { TransferCreditComponent } from './transfer-credit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ TransferCreditComponent ],
  imports: [
    CommonModule,
    TransferCreditRoutingModule,
    FormsModule,ReactiveFormsModule
    
  ]
})
export class TransferCreditModule { }
