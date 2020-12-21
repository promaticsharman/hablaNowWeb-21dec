import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfileComponent } from './user-profile.component';
import { FormsModule,FormGroup, FormBuilder, Validators, FormControl,ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [ UserProfileComponent ],
	imports: [
	CommonModule,
	UserProfileRoutingModule,
	FormsModule,
	ReactiveFormsModule,
	]
})
export class UserProfileModule { }
