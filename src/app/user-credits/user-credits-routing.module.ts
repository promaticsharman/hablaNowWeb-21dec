import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCreditsComponent } from './user-credits.component';

const routes: Routes = [{
	path: '',
	component: UserCreditsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserCreditsRoutingModule { }
