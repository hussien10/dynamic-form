import { Injectable } from '@angular/core';
import { TextInput } from '../components/dynamicInputs/text-input/text-input';
import { CheckboxInput } from '../components/dynamicInputs/checkbox-input/checkbox-input';
import { RadioInput } from '../components/dynamicInputs/radio-input/radio-input';

const INPUT_MAP: { [key: string]: any } = {
  text: TextInput,
  number: TextInput,
  email: TextInput,
  password: TextInput,
  checkbox: CheckboxInput,
  radio: RadioInput,
};

@Injectable({
  providedIn: 'root',
})
export class InputFactory {
resolve(type: string) {
    const component = INPUT_MAP[type];
    if (!component) {
      throw new Error(`Unsupported input type: ${type}`);
    }
    return component;
  }
}
