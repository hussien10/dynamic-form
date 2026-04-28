import { Component, Input } from '@angular/core';
import { FormFieldConfig } from '../../../interfaces/form-config';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BaseInputComponent } from '../../../classes/base-input';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
  providers: [{
      provide: NG_VALUE_ACCESSOR,
      useExisting: TextInput,
      multi: true
    }]
})
export class TextInput extends BaseInputComponent {
  @Input() field!: FormFieldConfig;
}
