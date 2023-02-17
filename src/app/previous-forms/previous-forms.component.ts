import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-previous-forms',
  templateUrl: './previous-forms.component.html',
  styleUrls: ['./previous-forms.component.scss'],
})
export class PreviousFormsComponent {
  question!: string[];
  answers!: unknown[];
  openLink(formName: string) {
    const adminName = this.forms.admin_name;
    const link = `http://localhost:4200/dynamic/?admin_name=${adminName}&form_name=${formName}`;
    window.alert(link);
  }

  

form_responses:any;

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




  show_responses(form_name:any){
   
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
      .get('http://localhost:7600/show_responses/'+form_name, { headers: headers1 })
      .subscribe((response) => {
        this.form_responses= response;
        console.log('Show my Forms', response);
        const csv = Papa.unparse({
          fields: this.form_responses.question,
          data: this.form_responses.answers,
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, form_name+'.csv');

      });

  }

  redirectToLink(link: string) {
    this.router.navigate([link]);
  }



  // downloadCSV() {
  //   const csv = Papa.unparse({
  //     fields: this.question,
  //     data: this.answers,
  //   });

  //   const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  //   saveAs(blob, 'data.csv');
  // }

}
