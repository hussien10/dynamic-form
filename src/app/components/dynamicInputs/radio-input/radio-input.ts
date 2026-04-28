import { Component, Input } from '@angular/core';
import { BaseInputComponent } from '../../../classes/base-input';
import { FormFieldConfig } from '../../../interfaces/form-config';

@Component({
  selector: 'app-radio-input',
  templateUrl: './radio-input.html',
  styleUrl: './radio-input.scss',
})
export class RadioInput extends BaseInputComponent {
  @Input() field!: FormFieldConfig;

  select(optionValue: any): void {
    this.handleValueChange(optionValue);
  }
}
