import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyUsersRoutingModule } from './my-users-routing.module';
import { MyUsersComponent } from './my-users.component';
import { FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';

import { NgxPaginationModule } from 'ngx-pagination';
import {NgbModule,NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
	declarations: [ MyUsersComponent ],
	imports: [
	CommonModule,
	MyUsersRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	NgxPaginationModule,
	NgbPaginationConfig,
	NgbModule
	]
})
export class MyUsersModule { }
