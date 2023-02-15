import { Component, ViewChild, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';

import { HeadComponent } from '../head/head.component';
import { ShortAnsComponent } from '../short-ans/short-ans.component';
import { NumberComponent } from '../number/number.component';
import { EmailComponent } from '../email/email.component';
import { DateComponent } from '../date/date.component';
import { SingleCorrectComponent } from '../single-correct/single-correct.component';
import { MultipleCorrectComponent } from '../multiple-correct/multiple-correct.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';

const formElementsMapping = {
  Title: 'app-head',
  'Short Answer': 'app-short-ans',
  Number: 'app-number',
  Email: 'app-email',
  Date: 'app-date',
  'Single Correct': 'app-single-correct',
  'Multiple Correct': 'app-multiple-correct',
};

@Component({
  selector: 'app-create-form',
  templateUrl: 'create-form.component.html',
  styleUrls: ['create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  item: string;
  options: string[];

  constructor(public httpclient: HttpClient) {
    this.item = 'Title';
    this.options = ['Option 1', 'Option 2', 'Option 3'];
  }

  ngOnInit(): void {}

  addOption(item: string): void {
    if (item === 'Single Correct') {
      // Add a new single correct option
      console.log("Single option added")
    } else if (item === 'Multiple Correct') {
      // Add a new multiple correct option
      console.log("Multiple option added")
    }
  }


  formElements = [
    'Title',
    'Short Answer',
    'Number',
    'Email',
    'Date',
    'Single Correct',
    'Multiple Correct',
  ];

  formStructure = [
    'Title',
    'Short Answer',
    'Number',
    'Email',
    'Date',
    'Single Correct',
    'Multiple Correct',
  ];

  mainForm = [];

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (
      event.previousContainer.id === 'formElements' &&
      event.container.id === 'formStructure'
    ) {
      const formElement = event.previousContainer.data[event.previousIndex];
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      event.container.data[event.currentIndex] = formElement;
    } else if (
      event.previousContainer.id === 'formStructure' &&
      event.container.id === 'formElements'
    ) {
      event.previousContainer.data.splice(event.previousIndex, 1);
    }
  }

  @ViewChild(HeadComponent)
  headComponent!: HeadComponent;

  @ViewChild(ShortAnsComponent)
  shortAnsComponent!: ShortAnsComponent;

  @ViewChild(NumberComponent)
  numberComponent!: NumberComponent;

  @ViewChild(EmailComponent)
  emailComponent!: EmailComponent;

  @ViewChild(DateComponent)
  dateComponent!: DateComponent;

  @ViewChild(SingleCorrectComponent)
  singleCorrectComponent!: SingleCorrectComponent;

  @ViewChild(MultipleCorrectComponent)
  multipleCorrectComponent!: MultipleCorrectComponent;

  onFormSubmit() {
    const formData: any[] = [];
    for (let i = 0; i < this.mainForm.length; i++) {
      if (this.mainForm[i] in formElementsMapping) {
        const key = this.mainForm[i] as keyof typeof formElementsMapping;
        switch (key) {
          case 'Title':
            formData.push({
              type: key,
              data: this.headComponent.getValue(),
            });
            break;
          case 'Short Answer':
            formData.push({
              type: key,
              data: this.shortAnsComponent.getValue(),
            });
            break;
          case 'Number':
            formData.push({
              type: key,
              data: this.numberComponent.getValue(),
            });
            break;
          case 'Email':
            formData.push({
              type: key,
              data: this.emailComponent.getValue(),
            });
            break;
          case 'Date':
            formData.push({
              type: key,
              data: this.dateComponent.getValue(),
            });
            break;
          case 'Single Correct':
            formData.push({
              type: key,
              data: this.singleCorrectComponent.getValue(),
            });
            break;
          case 'Multiple Correct':
            formData.push({
              type: key,
              data: this.multipleCorrectComponent.getValue(),
            });
            break;
          default:
            break;
        }
      }
    }
    let token;

    const auth_token = localStorage.getItem('currentuser');
    console.log(auth_token);

    async function postData(this: any) {
      let token;
      if (auth_token) {
        token = JSON.parse(auth_token);
        console.log(token);
      }
      const headers1 = new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      });

      console.log(formData);

      try {
        const response = await this.httpclient
          .post('http://localhost:7600/create_form', formData, {
            headers: headers1,
          })
          .toPromise();
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

    postData();
  }
}
