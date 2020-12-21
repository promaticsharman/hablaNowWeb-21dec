import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferCreditComponent } from './transfer-credit.component';

const routes: Routes = [{
	path: '',
	component: TransferCreditComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferCreditRoutingModule { }
