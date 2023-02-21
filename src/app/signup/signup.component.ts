import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  constructor(public httpclient: HttpClient,public router:Router) {}

  userNameFormControl = new FormControl();

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20),
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
  ]);

  matcher = new MyErrorStateMatcher();

  signupForm = new FormGroup({
    username: this.userNameFormControl,
    email: this.emailFormControl,
    password: this.passwordFormControl,
    confirmPassword: this.confirmPasswordFormControl,
  });

  isDisabled() {
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const confirmPassword = this.signupForm.value.confirmPassword;

    if (!email || !password || !confirmPassword) {
      return true;
    }

    if (password !== confirmPassword) {
      return true;
    }

    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(email)) {
      return true;
    }

    return false;
  }

  submit() {


    let headers1 = new HttpHeaders({
      'content-Type': 'application/json',
    });

    const obj = {
      username: this.signupForm.value.username,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
    };
    console.log(obj);
    
    this.httpclient
      .post('http://localhost:7600/reg', obj, { headers: headers1 })
      .subscribe((response) => {
        console.log(response);
        alert('successfully signup');
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 1000)
        
      },(error: HttpErrorResponse) => {
        if (error.status === 409) {
          alert('The user already existed!');
          setTimeout(() => {
            this.router.navigate(['/signup']);
          }, 1000);
        } else {
          console.error(error);
        }
      });

  }
} 