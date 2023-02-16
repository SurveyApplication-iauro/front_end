import { Component, ViewChild, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

// interface FormData {
//   formItems: Array<TitleData | ShortAnswerData | NumberData | EmailData | DateData | SingleCorrectData | MultipleCorrectData>;
// }

@Component({
  selector: 'app-create-form',
  templateUrl: 'create-form.component.html',
  styleUrls: ['create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  item: string;
  options: string[];
  singleCorrectComponent: any;
  multipleCorrectComponent: any;

  constructor(public httpclient: HttpClient) {
    this.item = 'Title';
    this.options = ['Option 1', 'Option 2', 'Option 3'];
  }

  ngOnInit(): void {}

  addOption(item: string): void {
    if (item === 'Single Correct') {
      // Add a new single correct option
      const singleCorrectComponent = this.singleCorrectComponent;
      const newOption = {
        id: uuidv4(),
        text: '',
        isCorrect: false,
        isEdited: true,
      };
      // Add the new option to the component's options array
      singleCorrectComponent.options.push(newOption);
      console.log('Single option added');
    } else if (item === 'Multiple Correct') {
      const newOption = `Option ${this.options.length + 1}`;
      this.options.push(newOption);
    }
  }

  formElements = [
    'Title',
    'Short Answer',
    'Number',
    'Email',
    'Date',
    // 'Single Correct',
    // 'Multiple Correct',
  ];

  formStructure = [
    'Title',
    'Short Answer',
    'Number',
    'Email',
    'Date',
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

  onFormSubmit(): void {
    const formData: any[] = [];
    const formItems = document.querySelectorAll('.form-item');
    formItems.forEach((formItem) => {
      const formItemData: any = {};
      const formFields = formItem.querySelectorAll('.form-field');
      formFields.forEach((formField: any) => {
        formItemData[formField.name] = formField.value;
      });
      if (formItem.classList.contains('options')) {
        const options: any[] = [];
        const optionFields = formItem.querySelectorAll('.option');
        optionFields.forEach((optionField: any) => {
          const option: any = {};
          option['label'] = optionField.querySelector('label').innerText;
          option['value'] = optionField.querySelector('input').checked;
          options.push(option);
        });
        formItemData['options'] = options;
      }
      formData.push(formItemData);
    });
    formData.unshift({ userName: '' });
    console.log(JSON.stringify(formData));

    let token;

      const auth_token = localStorage.getItem('currentuser');
      console.log(auth_token);

      if(auth_token){
        token= JSON.parse(auth_token)
        console.log(token)
        
      }
  
      const headers1 = new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization':"Bearer " +token
    })
        
    
  
      
      
      // const headers1 = new HttpHeaders().set(
      //   "authorization",
      //   JSON.parse(localStorage.getItem('currentUser') || '{}')   );
  
      console.log(formData);
      // Store formData in the database
  
    
      this.httpclient
        .post('http://localhost:7600/create_form', formData, { headers: headers1 })
        .subscribe((response) => {
          console.log(response);
        });
  
  }

  // onFormSubmit() {
  //   const formData = {};

  //   let token;

  //   const auth_token = localStorage.getItem('currentuser');
  //   console.log(auth_token);

  //   async function postData(this: any) {
  //     let token;
  //     if (auth_token) {
  //       token = JSON.parse(auth_token);
  //       console.log(token);
  //     }
  //     const headers1 = new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       authorization: 'Bearer ' + token,
  //     });

  //     console.log(formData);

  //     try {
  //       const response = await this.httpclient
  //         .post('http://localhost:7600/create_form', formData, {
  //           headers: headers1,
  //         })
  //         .toPromise();
  //       console.log(response);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   postData();
  // }
}
