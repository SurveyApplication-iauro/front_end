import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-previous-forms',
  templateUrl: './previous-forms.component.html',
  styleUrls: ['./previous-forms.component.scss'],
})

export class PreviousFormsComponent {

  forms: any = [
    {
      formName: 'Form 1',
      link: 'https://www.google.com',
    },
    {
      formName: 'Form 2',
      link: 'https://www.bing.com',
    },
    {
      formName: 'Form 3',
      link: 'https://www.duckduckgo.com',
    },
  ];

  constructor(private router: Router) {}

  redirectToLink(link: string) {
    this.router.navigate([link]);
  }
}
