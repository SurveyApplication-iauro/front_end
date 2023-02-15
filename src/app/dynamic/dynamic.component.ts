import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//import { AllservicesService } from '../allservices.service';

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
  public data: any;
  public url: string = '';
  public surveyID: String = '';
  dynamicForm = this.fb.group({});
  //.................
  admin_name!: string;
  form_name!: string;
  response_data: any;

  constructor(
    //public allservices: AllservicesService,
    private fb: FormBuilder,
    private route: Router,
    private activeroute: ActivatedRoute,
    public httpclient: HttpClient
  ) {}
  ngOnInit() {
    //To get a SurveyID from URL
    this.url = this.route.routerState.snapshot.url;
    this.surveyID = this.url.split('/')[2];

    this.activeroute.queryParams.subscribe((params) => {
      console.log(params); // { orderby: "price" }
      if (params) {
        this.admin_name = params['admin_name'];
        this.form_name = params['form_name'];
      }
      console.log(this.admin_name);
      console.log(this.form_name); // price

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
          this.data = { response: this.response_data };
        });
    });

    // modify the data for backend

    // this.allservices.getSurveyStructure(this.surveyID).subscribe((response: RootObject) => {
    //   // console.log(response);
    //   this.data = response;
    //   // this.formField=response;
    //   // console.log(this.formField);
    //   // this.setDynamicForm();
    // });
  }

  setDynamicForm() {
    // for(const control of controls)
    // {
    //   this.dynamicForm.addControl(control.title,this.fb.control(control.survey))
    //   console.log(typeof controls)
    // }
    // console.log(JSON.parse(JSON.stringify(this.data.survey[0])).question)
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
  }
}
