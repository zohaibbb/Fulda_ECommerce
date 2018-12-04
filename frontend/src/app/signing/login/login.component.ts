import { Component, OnInit } from '@angular/core';
import { SigningService } from '../../services/signing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form;
  posted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private signingService: SigningService) {
      this.form = fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      });
     }
     get username() { return this.form.get('username'); }
     get password() { return this.form.get('password'); }
    login() {
      console.log(this.form);
      this.signingService.loginUser(this.form.value)
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
   
  ngOnInit() {
  }

}
