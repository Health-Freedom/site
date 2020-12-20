import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DonateComponent } from './donate/donate.component';

const routes: Routes = [
  {
    path: "donate",
    component: DonateComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonateRoutingModule { }
