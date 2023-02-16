import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-single-correct',
  templateUrl: './single-correct.component.html',
  styleUrls: ['./single-correct.component.scss'],
})
export class SingleCorrectComponent {
  selectedOption = new FormControl('');
  questionControl = new FormControl('');

  @Output() valueEvent = new EventEmitter<void>();
  options: any;

  getValue() {
    this.valueEvent.emit();
    console.log(this.selectedOption.value);
    return this.selectedOption.value;
  }
}
