import { FormGroup } from '@angular/forms';
import { Pipe, PipeTransform } from '@angular/core';
import { FormFieldConfig } from '../interfaces/form-config';

@Pipe({
  name: 'getErrors'
})
export class GetErrorsPipe implements PipeTransform {

  transform(value: FormFieldConfig, formGroup: FormGroup ,errorKey: string): string | null {
    const control = formGroup.get(value.key);
    if (!control || !control.errors) {
      return null;
    }
      return value.errorMessages && value.errorMessages[errorKey] ? value.errorMessages[errorKey] : errorKey;
  }

}
