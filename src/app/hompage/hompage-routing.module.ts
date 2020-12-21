import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HompageComponent } from './hompage.component';

const routes: Routes = [{
	path: '',
	component: HompageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HompageRoutingModule { }
