import { Component } from '@angular/core';
import { FormGenerator } from '../form-generator/form-generator';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormConfig } from '../../interfaces/form-config';

@Component({
  selector: 'app-form-creator',
  imports: [FormGenerator],
  templateUrl: './form-creator.html',
  styleUrl: './form-creator.scss',
})
export class FormCreator {

  form:FormConfig = {
    fields: [
      {
        key: 'name',
        label: 'Name',
        type: 'text',
        order: 1,
        validators: [Validators.required ],
        customValidator: [this.validateName()],
         errorMessages: {
          required: 'Name is required',
        }
      },
      {
        key: 'age',
        label: 'Age',
        type: 'number',
        order: 3,
        validators: [Validators.required, Validators.min(18), Validators.max(100)],
        customValidator: [this.validateAge()],
        errorMessages: {
          required: 'Age is required',
          min: 'Minimum age is 18',
          max: 'Maximum age is 100',
          agematch: 'User is declined',
        }
      },
      {
        key: 'gender',
        label: 'Gender',
        legend: 'Select your gender',
        type: 'radio',
        order: 2,
        optionsPerRow: 3,
        options: [
          { key: 'Male', value: 'male' },
          { key: 'Female', value: 'female' },
          { key: 'Other', value: 'other' },
        ],
        validators: [Validators.required],
        customValidator: [this.validateGenderAge() ],
        errorMessages: {
          required: 'Please select a gender',
          genderAge: 'Female users must be at least 21',
        }
      },
      {
        key: 'agree',
        label: 'Agree to terms',
        legend: 'Terms and conditions',
        type: 'checkbox',
        order: 4,
        defaultValue: false,
        validators: [Validators.requiredTrue],
        errorMessages: {
          required: 'You must agree to continue',
        }
      }
    ],
    layout: {
      columns: 3,
      responsiveColumns: {
        xs: 1,
        sm: 2,
        md: 2,
        lg: 3,
      },
      gap: 3,
      bordered: true,
      margin: 'my-1 mx-5',
      padding: 'p-4',
    },
    legend: 'User registration form',
    groubValidators: [this.validateUser()]
  }
validateUser(): ValidatorFn { return (control: AbstractControl): ValidationErrors | null => {
  const formGroup = control as FormGroup;
  const name = formGroup.get('name')?.value;
  const age = formGroup.get('age')?.value;
  if (!name || !age) {
    return null;
  }

  return name === 'hussien' && age > 25 ? { mismatch: 'User is declined' } : null;
}}
validateAge(): ValidatorFn { return (control: AbstractControl): ValidationErrors | null => {
  const age = control.value;
  if (age === null || age === undefined) {
    return null; // Don't validate if age is not provided
  }
  return age > 25 ? { agematch: 'User is declined' } : null;
}}
validateName(): ValidatorFn { return (control: AbstractControl): ValidationErrors | null => {
  const name = control.value;
  if (!name) {
    return null; // Don't validate if name is not provided
  }
  return name === 'hamada' ? { namematch: 'name must be hussien to be declined' } : null;
}}

validateGenderAge(): ValidatorFn { return (control: AbstractControl): ValidationErrors | null => {
  const value = control.value;
  const ageControl = (control.parent as FormGroup)?.get('age');
  if (!value || !ageControl) {
    return null;
  }

  if (value === 'female' && ageControl.value < 21) {
    return { genderAge: true };
  }

  return null;
}}
}
