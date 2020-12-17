import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryRouteComponent } from './category-route/category-route.component';

const routes: Routes = [
  {
    path: 'category/:id',
    component: CategoryRouteComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CategoryRoutingModule { }