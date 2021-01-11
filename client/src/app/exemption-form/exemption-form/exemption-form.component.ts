import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exemption-form',
  templateUrl: './exemption-form.component.html',
  styleUrls: ['./exemption-form.component.scss']
})
export class ExemptionFormComponent implements OnInit {
  recaptchaResponse: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.maxLength(100)]
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(100)]
    })
  });

  errorMessage?: string;
  isLoading = false;
  isDone = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onRecaptchaResponse(response: string | null) {
    this.recaptchaResponse.next(response);
  }

  submit() {
    this.isLoading = true;
    this.errorMessage = undefined;

    this.http.post(`${environment.apiURL}/recaptcha-post`, {
      code: this.recaptchaResponse.value,
      model: 'exemption-request',
      data: this.form.value
    }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.errorMessage = err.error?.error;
        this.isLoading = false;
        return throwError(this.errorMessage);
      }),
      tap(() => {
        this.isLoading = false;
        this.isDone = true;
      }),
      first()
    ).subscribe();
  }
}
