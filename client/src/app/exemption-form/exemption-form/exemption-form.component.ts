import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-exemption-form',
  templateUrl: './exemption-form.component.html',
  styleUrls: ['./exemption-form.component.scss']
})
export class ExemptionFormComponent implements OnInit {
  recaptchaResponse: string | null = null;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email, Validators.maxLength(100)]
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(100)]
    })
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onRecaptchaResponse(response: string | null) {
    this.recaptchaResponse = response
  }

  submit() {
    this.http.post(`${environment.apiURL}/recaptcha-post`, {
      code: this.recaptchaResponse,
      model: 'exemption-request',
      data: this.form.value
    }).subscribe();
  }
}
