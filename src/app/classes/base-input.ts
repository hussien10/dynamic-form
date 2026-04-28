import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({ template: '' })
export abstract class BaseInputComponent implements ControlValueAccessor {

  // Angular injects the connected FormControl automatically
  ngControl = inject(NgControl, { self: true, optional: true });

  @Input() value: any = '';
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<any>();
  @Output() touched = new EventEmitter<void>();

  onChange: (val: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    // connect this component to the form control
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  // called by Angular to write value into the component
  writeValue(value: any): void {
    this.value = value;
  }

  // called by Angular to register your change emitter
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // called by Angular to register your touched emitter
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // called by Angular when the control is disabled
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // bridge methods for template event wiring
  handleValueChange(value: any) {
    this.value = value;
    this.onChange(value);
    this.valueChange.emit(value);
  }

  handleTouched() {
    this.onTouched();
    this.touched.emit();
  }
}
