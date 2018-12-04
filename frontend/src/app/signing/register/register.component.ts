import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SigningService } from '../../services/signing.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form;
  posted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private signingService: SigningService
  ) {
     this.form = fb.group({
      firstname: ['', [Validators.required]],
      lstname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      userrole: ['', [Validators.required]],
      phonenumber: ['', [Validators.required]],
      psswrd1: ['', [Validators.required]],
      psswrd2: ['', [Validators.required]]
    });
   }
   get firstname() { return this.form.get('firstname'); }
   get lstname() { return this.form.get('lstname'); }
   get email() { return this.form.get('email'); }
   get userrole() { return this.form.get('userrole'); }
   get phonenumber() { return this.form.get('phonenumber'); }
   get psswrd1() { return this.form.get('psswrd1'); }
   get psswrd2() { return this.form.get('psswrd2'); }
 
   register() {
     console.log(this.form);
     this.signingService.registerUser(this.form.value)
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
