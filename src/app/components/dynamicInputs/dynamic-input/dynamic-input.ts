import { InputFactory } from './../../../services/input-factory';
import {
  Component,
  ComponentRef,
  inject,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { FormFieldConfig } from '../../../interfaces/form-config';
import { FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-input',
  imports: [ReactiveFormsModule],
  templateUrl: './dynamic-input.html',
  styleUrl: './dynamic-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DynamicInput,
      multi: true,
    },
  ],
})
export class DynamicInput {
  @Input() field!: FormFieldConfig;
  @Input() control?: FormControl;
  factory = inject(InputFactory);
  vcr = inject(ViewContainerRef);

  private ref!: ComponentRef<any>;
  private onChange: (val: any) => void = () => {};
  private onTouched: () => void = () => {};
  ngOnInit() {
    const component = this.factory.resolve(this.field.type);
    this.ref = this.vcr.createComponent(component);

    this.ref.setInput('field', this.field);

    this.ref.instance.valueChange?.subscribe((val: any) => {
      this.onChange(val);
    });

    this.ref.instance.touched?.subscribe(() => {
      this.onTouched();
    });

    this.ref.changeDetectorRef.markForCheck();

  }
  writeValue(value: any): void {
    this.ref?.setInput('value', value);
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  setDisabledState(isDisabled: boolean): void {
    this.ref?.setInput('disabled', isDisabled);
  }
}
