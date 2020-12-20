import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonateRoutingModule } from './donate-routing.module';
import { DonateComponent } from './donate/donate.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { StripeModule } from 'stripe-angular';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [DonateComponent],
  imports: [
    CommonModule,
    DonateRoutingModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    StripeModule,
    HttpClientModule
  ]
})
export class DonateModule { }
