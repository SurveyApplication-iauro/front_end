import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-multiple-correct',
  templateUrl: './multiple-correct.component.html',
  styleUrls: ['./multiple-correct.component.scss'],
})
export class MultipleCorrectComponent {
  checkboxes = [false, false, false, false];

  questionControl = new FormControl('');
  options: any;

  onCheckboxChange(index: number) {
    this.checkboxes[index - 1] = !this.checkboxes[index - 1];
  }

  @Output() valueEvent = new EventEmitter<void>();

  getValue() {
    console.log(`multiple correct: ${this.checkboxes}`);
    this.valueEvent.emit();
    return this.checkboxes;
  }
}