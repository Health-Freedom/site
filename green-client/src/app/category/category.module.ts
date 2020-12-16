import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryRouteComponent } from './category-route/category-route.component';
import { CategoryRoutingModule } from './category-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [CategoryRouteComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatListModule,
    MatToolbarModule
  ]
})
export class CategoryModule { }
