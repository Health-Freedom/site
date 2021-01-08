import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemption-form',
  templateUrl: './exemption-form.component.html',
  styleUrls: ['./exemption-form.component.scss']
})
export class ExemptionFormComponent implements OnInit {
  recaptchaResponse: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onRecaptchaResponse(response: string | null) {
    this.recaptchaResponse = response
  }

  submit() {
    
  }
}
