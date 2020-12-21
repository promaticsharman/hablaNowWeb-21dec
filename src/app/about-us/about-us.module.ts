import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsRoutingModule } from './about-us-routing.module';
import { AboutUsComponent } from './about-us.component';
 import {SafeHtmlPipe} from '../pipe/safe-html.pipe';
@NgModule({
  declarations: [AboutUsComponent,SafeHtmlPipe],
  imports: [
    CommonModule,
    AboutUsRoutingModule
  ]
})
export class AboutUsModule { }
