import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvalidRouteComponent } from './invalid-route/invalid-route.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
