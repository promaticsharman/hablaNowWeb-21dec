import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserCreditsRoutingModule } from './user-credits-routing.module';
import { UserCreditsComponent } from './user-credits.component';

@NgModule({
  declarations: [ UserCreditsComponent ],
  imports: [
    CommonModule,
    UserCreditsRoutingModule
  ]
})
export class UserCreditsModule { }
