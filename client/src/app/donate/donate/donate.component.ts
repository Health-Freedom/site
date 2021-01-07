import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError, first, filter } from 'rxjs/operators';
import { SiteDataService } from 'src/app/site-data.service';
import { StripeScriptTag } from 'stripe-angular';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent {

  amount = new FormControl('', {
    validators: [
      Validators.required,
      Validators.min(1)
    ]
  });

  runRequestErrorMessage?: string;

  loading = false;

  constructor(private stripeScriptTag: StripeScriptTag,
    private httpClient: HttpClient,
    service: SiteDataService) {
    if (!this.stripeScriptTag.StripeInstance) {
      service.getSettings().valueChanges
        .pipe(first(setting => !!setting?.data?.setting?.stripe_key))
        .subscribe(result => {
          this.stripeScriptTag.setPublishableKey(result.data.setting?.stripe_key ?? '');
        });
    }
  }

  get errorMessage(): string {
    if (this.amount.dirty && this.amount.errors) {
      if (this.amount.errors.pattern) {
        return 'Enter a number';
      }
      if (this.amount.errors.min) {
        return 'Amount must be greater than 0';
      }
      if (this.amount.errors.required) {
        return 'Please specify an amount';
      }
    }

    return this.runRequestErrorMessage ?? '';
  }

  async submit() {
    const stripe = await this.stripeScriptTag.promiseInstance();
    this.loading = true;

    this.httpClient.get<{ id: string }>("/.netlify/functions/make_stripe", {
      params: {
        amount: this.amount.value
      }
    }).pipe(
      catchError(error => {
        this.loading = false;
        let errorMessage = 'Donation failed. Please try again, or contact us for assistance';

        try {
          errorMessage += '<br><br>Here is the raw data info:<br>' + JSON.stringify(error);
        } catch { }

        this.runRequestErrorMessage = errorMessage;

        return throwError(errorMessage);
      })
    )
      .subscribe(response => {
        (stripe as any).redirectToCheckout({
          sessionId: response.id
        });
      });
  }
}
