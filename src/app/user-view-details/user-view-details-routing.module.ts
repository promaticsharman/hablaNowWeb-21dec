import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserViewDetailsComponent } from './user-view-details.component';


const routes: Routes = [{
  path: '',
  component : UserViewDetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserViewDetailsRoutingModule { }
