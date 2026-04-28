import { ValidatorFn } from "@angular/forms";

export interface FormFieldConfig {
  key: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio';
  validators?: ValidatorFn[];
  customValidator?: ValidatorFn[];
  errorMessages?: { [errorKey: string]: string };
  defaultValue?: any;
  options?: { key: string; value: any }[];
  order?: number; // For ordering fields
  legend?: string; // Optional fieldset legend text
  optionsPerRow?: number; // Number of options to display per row for radio/checkbox fields
}

export interface FormLayoutConfig {
  columns?: number; // Number of fields per row (default 1)
  responsiveColumns?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>>;
  gap?: number; // Bootstrap gap class (0-5)
  bordered?: boolean; // Whether the form wrapper has a Bootstrap border
  margin?: string; // Optional Bootstrap spacing classes for outer margin
  padding?: string; // Optional Bootstrap spacing classes for inner padding
}

export interface FormConfig {
  fields: FormFieldConfig[];
  groubValidators?: ValidatorFn[];
  layout?: FormLayoutConfig;
  legend?: string; // Optional overall form legend/title
}
