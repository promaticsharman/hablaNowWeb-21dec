import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgModule} from '@angular/core';
import { FaqRoutingModule } from './faq-routing.module';
import { FaqComponent } from './faq.component';

 
@NgModule({
  declarations: [FaqComponent],
  
  imports: [
  
    FaqRoutingModule,
    MatButtonModule,
    MatIconModule,
    
  ]
})
export class FaqModule {}
 
