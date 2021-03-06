import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExemptionFormRoutingModule } from './exemption-form-routing.module';
import { RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { ExemptionFormComponent } from './exemption-form/exemption-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {TextFieldModule} from '@angular/cdk/text-field';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TextFieldModule,
    ExemptionFormRoutingModule,
    RecaptchaModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: "6Lf4uiMaAAAAAN9whHW8q3bt_D75LwdW6Grja_Hc" } as RecaptchaSettings,
    }
  ],
  declarations: [ExemptionFormComponent]
})
export class ExemptionFormModule { }
