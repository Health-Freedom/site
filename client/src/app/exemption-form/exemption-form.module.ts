import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExemptionFormRoutingModule } from './exemption-form-routing.module';
import { RecaptchaModule, RecaptchaSettings, RECAPTCHA_SETTINGS } from 'ng-recaptcha';
import { ExemptionFormComponent } from './exemption-form/exemption-form.component';


@NgModule({
  imports: [
    CommonModule,
    ExemptionFormRoutingModule,
    RecaptchaModule
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
