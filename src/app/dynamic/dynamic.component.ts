import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Survey {
  question: string;
  answertype: string;
  options: string[];
}

export class RootObject {
  title: string = '';
  email: string = '';
  survey: Survey[] = [];
}

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicComponent implements OnInit {
  username: string = '';
  public data: any;
  public url: string = '';
  public surveyID: String = '';
  dynamicForm = this.fb.group({});
  //.................
  admin_name!: string;
  form_name!: string;
  response_data: any;

  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activeroute: ActivatedRoute,
    public httpclient: HttpClient
  ) {}
  ngOnInit() {
    this.url = this.route.routerState.snapshot.url;
    this.surveyID = this.url.split('/')[2];

    this.activeroute.queryParams.subscribe((params) => {
      console.log(params);
      if (params) {
        this.admin_name = params['admin_name'];
        this.form_name = params['form_name'];
      }
      console.log(this.admin_name);
      console.log(this.form_name);

      const headers1 = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      this.httpclient
        .get(
          'http://localhost:7600/user/get_form/' +
            this.admin_name +
            '/' +
            this.form_name,
          { headers: headers1 }
        )
        .subscribe((response) => {
          this.response_data = response;
          console.log(response);
          // this.data = this.response_data
          // this.data = { response: this.response_data };
          console.log(this.username);
          //you get the username here
        });
    });

    this.data = {
      response: [
        {
          type: 'Title',
          data: {
            formTitle: '',
            formDescription: '',
          },
        },
        {
          type: 'Short Answer',
          data: {
            question: '',
            answer: '',
          },
        },
        {
          type: 'Email',
          data: {
            question: '',
            email: '',
          },
        },
        {
          type: 'Number',
          data: {
            question: '',
            number: '',
          },
        },
      ],
    };
  }

  saveForm(): void {
    const responses = this.data.response.map(
      (item: { type: any; data: { formTitle: any; question: any } }) => {
        const type = item.type;
        let response;
        switch (type) {
          case 'Title':
            response = item.data.formTitle;
            break;
          case 'Short Answer':
          case 'Number':
          case 'Email':
            response = (
              document.querySelector(
                `[name="${type}-${item.data.question}"]`
              ) as HTMLInputElement
            )?.value;
            break;
          default:
            response = '';
            break;
        }
        return { type, response };
      }
    );
    console.log(responses);
    console.log('print username on save frm');
    console.log(this.username);
  }
}
