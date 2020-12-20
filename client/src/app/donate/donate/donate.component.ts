import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StripeInstance, StripeScriptTag } from 'stripe-angular';

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

  constructor(private stripeScriptTag: StripeScriptTag,
    private httpClient: HttpClient) { }

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

    this.httpClient.get<{ id: string }>("/.netlify/functions/make_stripe", {
      params: {
        amount: this.amount.value
      }
    }).pipe(
      catchError(error => {
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