import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-previous-forms',
  templateUrl: './previous-forms.component.html',
  styleUrls: ['./previous-forms.component.scss'],
})
export class PreviousFormsComponent {
  openLink(formName: string) {
    const adminName = this.forms.admin_name;
    const link = `http://localhost:4200/dynamic/?admin_name=${adminName}&form_name=${formName}`;
    window.alert(link);
  }

  forms: any = {
    admin_name: 'hello',
    my_forms: [
      {
        Form_name: 'Form_1',
      },
      {
        Form_name: 'Form_2',
      },
      {
        Form_name: 'Form_3',
      },
      {
        Form_name: 'Form_4',
      },
    ],
  };

  constructor(private router: Router, public httpclient: HttpClient) {}
  ngOnInit() {
    let token;

    const auth_token = localStorage.getItem('currentuser');
    console.log(auth_token);

    if (auth_token) {
      token = JSON.parse(auth_token);
      console.log(token);
    }

    const headers1 = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token,
    });

    this.httpclient
      .get('http://localhost:7600/show_my_forms', { headers: headers1 })
      .subscribe((response) => {
        this.forms = response;
        console.log('Show my Forms', response);
      });
  }

  redirectToLink(link: string) {
    this.router.navigate([link]);
  }
}
