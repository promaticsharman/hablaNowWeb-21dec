import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HompageRoutingModule } from './hompage-routing.module';
import { HompageComponent } from './hompage.component';

@NgModule({
  declarations: [ HompageComponent ],
  imports: [
    CommonModule,
    HompageRoutingModule
  ]
})
export class HompageModule { }
