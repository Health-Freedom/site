import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExemptionFormComponent } from './exemption-form/exemption-form.component';

const routes: Routes = [
  {
    path: 'exemption',
    component: ExemptionFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExemptionFormRoutingModule { }
