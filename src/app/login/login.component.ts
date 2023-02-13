import { Component } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  constructor(public httpclient: HttpClient) {}
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

    if (password.length < 6) {
      return true;
    }

    return false;
  }

  login() {
    console.log(this.loginForm.value);
    let headers1 = new HttpHeaders({
      'content-Type': 'application/json',
    });
    let obj = {
      username: this.loginForm.value.userName,

      password: this.loginForm.value.password,
    };
    this.httpclient
      .post('http://localhost:7600/reg', obj, { headers: headers1 })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
