import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonateRoutingModule } from './donate-routing.module';
import { DonateComponent } from './donate/donate.component';
import { StripeModule } from 'stripe-angular';


@NgModule({
  declarations: [DonateComponent],
  imports: [
    CommonModule,
    DonateRoutingModule,
    StripeModule
  ]
})
export class DonateModule { }
