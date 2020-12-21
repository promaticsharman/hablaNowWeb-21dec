import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserViewDetailsRoutingModule } from './user-view-details-routing.module';
import { UserViewDetailsComponent } from './user-view-details.component';


@NgModule({
  declarations: [UserViewDetailsComponent],
  imports: [
    CommonModule,
    UserViewDetailsRoutingModule
  ]
})
export class UserViewDetailsModule { }
