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
  useremail: string = '';
  public data: any;
  public url: string = '';
  public surveyID: String = '';
  

  dynamicForm = this.fb.group({});
  //.................
  admin_name!: string;
  form_name!: string;
  response_data: any;
  is_saved=false;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private activeroute: ActivatedRoute,
    public httpclient: HttpClient
  ) {}
  //load_status=true;
  
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
          //this.response_data = response;
          console.log(response);
          // this.data = this.response_data
          this.data = { response: response };
          
          console.log(this.username);
          
          //you get the username here
        });
    });

    //make changes here

    // this.data = {
    //   response: [
    //     {
    //       Title: 'THis is you r frm ititil',
    //     },
    //     {
    //       type: 'Short Answer',
    //       question: 'What is your name',
    //     },
    //     {
    //       type: 'Email',
    //       question: 'your prsnl email',
    //     },
    //     {
    //       type: 'Number',
    //       question: 'your phone no.',
    //     },
    //   ],
    // };

   
  }
  
  saveForm(): void {
    this.data.response.shift();
    const responses = this.data.response.map(
      (item: { Type: any; question: any }) => {
        const Type = item.Type;
        let response;
        switch (Type) {
          case 'short answer':
          case 'number':
          case 'email':
          case 'date':
            response = (
              document.querySelector(
                `[name="${Type}-${item.question}"]`
              ) as HTMLInputElement
            )?.value;
            break;
          default:
            break;
        }
        return { Type, response };
      }
    );
    responses.unshift({"useremail": this.useremail} );
    responses.unshift({ "username": this.username } );
    alert("your responses has been saved")
      this.is_saved=true
      
    console.log(responses);


  /////integrator changes//////
  const headers2 = new HttpHeaders({
    'Content-Type': 'application/json'
})
console.log("the admin_name in the last",this.admin_name)
this.httpclient
    .post('http://localhost:7600/user/fill_form/'+this.admin_name+"/"+this.form_name  , responses, { headers: headers2 })
    .subscribe((response) => {
      alert("your responses has been saved")
      this.is_saved=true
      console.log(response);
      this.route.navigate(['/head'])
    });



  }
}
