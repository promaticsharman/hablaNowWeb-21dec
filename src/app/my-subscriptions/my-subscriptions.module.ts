import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MySubscriptionsRoutingModule } from './my-subscriptions-routing.module';
import { MySubscriptionsComponent } from './my-subscriptions.component';
import { FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ MySubscriptionsComponent ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MySubscriptionsRoutingModule
  ]
})
export class MySubscriptionsModule { }
