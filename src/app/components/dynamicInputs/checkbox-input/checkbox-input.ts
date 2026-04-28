import { Component, Input } from '@angular/core';
import { BaseInputComponent } from '../../../classes/base-input';
import { FormFieldConfig } from '../../../interfaces/form-config';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.html',
  styleUrl: './checkbox-input.scss',
})
export class CheckboxInput extends BaseInputComponent {
  @Input() field!: FormFieldConfig;

  isChecked(optionValue: any): boolean {
    if (!Array.isArray(this.value)) {
      return false;
    }
    return this.value.includes(optionValue);
  }

  toggleOption(optionValue: any, checked: boolean): void {
    let newValue = Array.isArray(this.value) ? [...this.value] : [];

    if (checked) {
      if (!newValue.includes(optionValue)) {
        newValue.push(optionValue);
      }
    } else {
      newValue = newValue.filter(v => v !== optionValue);
    }

    this.handleValueChange(newValue);
  }

  toggleSingle(checked: boolean): void {
    const newValue = checked;
    this.handleValueChange(newValue);
  }
}
