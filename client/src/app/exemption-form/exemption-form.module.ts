import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExemptionFormRoutingModule } from './exemption-form-routing.module';
import { RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { ExemptionFormComponent } from './exemption-form/exemption-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ExemptionFormRoutingModule,
    RecaptchaModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" } as RecaptchaSettings,
    }
  ],
  declarations: [ExemptionFormComponent]
})
export class ExemptionFormModule { }
