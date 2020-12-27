import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CancelComponent } from './cancel/cancel.component';
import { DonateComponent } from './donate/donate.component';
import { ThankyouComponent } from './thankyou/thankyou.component';

const routes: Routes = [
  {
    path: "donate",
    component: DonateComponent,
    children: [
      {
        path: "thankyou",
        component: ThankyouComponent
      },
      {
        path: "cancel",
        component: CancelComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonateRoutingModule { }
