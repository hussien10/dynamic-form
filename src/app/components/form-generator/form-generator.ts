import { KeyValuePipe } from '@angular/common';
import { Component, input, OnInit, computed } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  AbstractControlOptions,
} from '@angular/forms';
import { FormConfig, FormFieldConfig } from '../../interfaces/form-config';
import { DynamicInput } from '../dynamicInputs/dynamic-input/dynamic-input';

const breakpointPrefixes: Record<string, string> = {
  xs: '',
  sm: 'sm',
  md: 'md',
  lg: 'lg',
  xl: 'xl',
  xxl: 'xxl',
};

@Component({
  selector: 'app-form-generator',
  imports: [ReactiveFormsModule, DynamicInput,KeyValuePipe],
  templateUrl: './form-generator.html',
  styleUrl: './form-generator.scss',
})
export class FormGenerator implements OnInit {
  configrations = input.required<FormConfig>();
  form!: FormGroup;

  // Computed signal for sorted fields
  sortedFields = computed(() => {
    return [...this.configrations().fields].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  });

  ngOnInit(): void {
    const formGroup: { [key: string]: FormControl } = {};

    this.configrations().fields.forEach((field) => {
      const allValidators = [...(field.validators || []), ...(field.customValidator || [])];
      formGroup[field.key] = new FormControl(field.defaultValue ?? '', allValidators);
    });

    const options: AbstractControlOptions = {
      validators: this.configrations().groubValidators || [],
    };

    this.form = new FormGroup(formGroup, options);
  }

  getControl(key: string) {
    return this.form.get(key) as FormControl;
  }

  get groupErrors(): string[] {
    if (!this.form?.errors) return [];
    return Object.keys(this.form.errors);
  }

  // Helper method to get Bootstrap column class
  getColClass(): string {
    const responsive = this.configrations().layout?.responsiveColumns;
    const defaultCols = this.configrations().layout?.columns ?? 1;
    const classes: string[] = [];

    if (responsive) {
      for (const breakpoint of ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'] as const) {
        const count = responsive[breakpoint] ?? defaultCols;
        const span = Math.max(1, Math.min(12, Math.floor(12 / count)));
        const prefix = breakpointPrefixes[breakpoint];
        classes.push(prefix ? `col-${prefix}-${span}` : `col-${span}`);
      }
    } else {
      const span = Math.max(1, Math.min(12, Math.floor(12 / defaultCols)));
      classes.push(`col-${span}`);
    }

    return classes.join(' ');
  }

  // Helper method to get row gap class
  getRowClass(): string {
    const gap = this.configrations().layout?.gap ?? 3; // Default gap-3
    return `row g-${gap}`;
  }

  getFormWrapperClass(): string {
    const margin = this.configrations().layout?.margin ?? 'my-4 mx-auto';
    const padding = this.configrations().layout?.padding ?? 'p-4';
    const isBordered = this.configrations().layout?.bordered ?? false;
    const borderClasses = isBordered ? 'border rounded shadow-sm bg-white' : '';
    return [margin, padding, borderClasses].filter(Boolean).join(' ').trim();
  }
}
