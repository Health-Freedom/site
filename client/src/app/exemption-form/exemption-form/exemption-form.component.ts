import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-exemption-form',
  templateUrl: './exemption-form.component.html',
  styleUrls: ['./exemption-form.component.scss']
})
export class ExemptionFormComponent implements OnInit {
  recaptchaResponse: string | null = null;

  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.requiredTrue, Validators.email, Validators.maxLength(100)]
    }),
    description: new FormControl('', {
      validators: [Validators.requiredTrue, Validators.maxLength(100)]
    })
  });

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  onRecaptchaResponse(response: string | null) {
    this.recaptchaResponse = response
  }

  submit() {
    this.http.post('', {
      code: this.recaptchaResponse,
      model: 'exemption_request',
      data: {
        email: this.form.get('email').value,
        description: this.form.get('description').value
      }
    });
  }
}
