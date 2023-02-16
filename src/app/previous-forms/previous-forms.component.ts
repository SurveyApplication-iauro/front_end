import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  //http://localhost:4200/dynamic/?admin_name=${admin_name}&form_name=${form_name}

  constructor(private router: Router) {}

  redirectToLink(link: string) {
    this.router.navigate([link]);
  }
}
