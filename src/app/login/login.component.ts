import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(public httpclient: HttpClient, private router: Router) {}

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [Validators.required]);
  userNameFormControl = new FormControl();

  matcher = {
    isErrorState: (control: FormControl) => {
      return control.invalid && control.touched;
    },
  };

  loginForm = new FormGroup({
    userName: this.userNameFormControl,
    password: this.passwordFormControl,
  });

  isDisabled() {
    const userName = this.loginForm.value.userName;
    const password = this.loginForm.value.password;

    if (!userName || !password) {
      return true;
    }

    if (password.length < 4) {
      return true;
    }

    return false;
  }

  login() {
    // console.log(this.loginForm.value);
    console.log('-----pass here-----')
    console.log(this.loginForm.value.userName);
    console.log(this.loginForm.value.password);
    console.log('-----pass here-----');

    
    const headers1 = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const obj = {
      username: this.loginForm.value.userName,
      password: this.loginForm.value.password,
    };
    this.httpclient
      .post('http://localhost:7600/login', obj, { headers: headers1 })
      .subscribe(
        (response) => {
          console.log(response);
          localStorage.setItem("currentuser",JSON.stringify(response))
            alert('User Login Successfully.');
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 500);// handle successful login case
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            alert('Wrong credentials. Please try again.');
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 500);
          } else {
            console.error(error);
          }
        }
      );
  }
}
