import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnterOtpRoutingModule } from './enter-otp-routing.module';
import { EnterOtpComponent } from './enter-otp.component'
import { FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from  'ng-otp-input';
@NgModule({
	declarations: [ EnterOtpComponent ],
	imports: [
	CommonModule,
	EnterOtpRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	NgOtpInputModule
	],
	 schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
})
export class EnterOtpModule { }
