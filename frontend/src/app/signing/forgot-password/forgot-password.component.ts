import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SigningService } from '../../services/signing.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form;
  posted = false;
  constructor( private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private signingService: SigningService) {
      this.form = fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
  }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }

  ngOnInit() {
  }
  changePassword(){
    console.log(this.form);
    this.signingService.changePassword(this.form.value)
    .subscribe(
      result => {
        console.log(result);
        this.form.reset();
        this.posted = true;
        setTimeout(() => {
          this.posted = false;
        }, 5000);
      },
      err => console.log(err)
    );
  }
}
