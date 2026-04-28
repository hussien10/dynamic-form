# Dynamic Form Builder

A powerful, flexible, and fully customizable dynamic form builder for Angular applications. Built with Bootstrap 5 for responsive design and modern UI components.

## Features

- 🎨 **Bootstrap Integration**: Fully styled with Bootstrap 5 components
- 📱 **Responsive Design**: Configurable responsive columns for different screen sizes
- 🔧 **Dynamic Configuration**: Configure forms through TypeScript interfaces
- ✅ **Validation**: Built-in and custom validation support
- 🎯 **Field Types**: Support for text, number, email, password, radio, checkbox, and select inputs
- 📋 **Field Ordering**: Configurable field order and positioning
- 🎨 **Styling Options**: Configurable borders, spacing, and layout
- 📝 **Legends & Labels**: Support for field legends and custom labels
- 🔢 **Options Layout**: Configurable number of options per row for radio/checkbox fields
- 🚀 **TypeScript**: Full TypeScript support with type safety

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (v20 or higher)

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd dynamic-form
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200/`

## Configuration

### Form Configuration

The form is configured using the `FormConfig` interface:

```typescript
interface FormConfig {
  fields: FormFieldConfig[];
  groubValidators?: ValidatorFn[];
  layout?: FormLayoutConfig;
  legend?: string;
}
```

### Field Configuration

Each field is configured using the `FormFieldConfig` interface:

```typescript
interface FormFieldConfig {
  key: string;                    // Unique field identifier
  label: string;                  // Field label
  type: 'text' | 'email' | 'password' | 'number' | 'select' | 'checkbox' | 'radio';
  validators?: ValidatorFn[];     // Angular validators
  customValidator?: ValidatorFn[]; // Custom validators
  errorMessages?: { [errorKey: string]: string }; // Error message mapping
  defaultValue?: any;             // Default field value
  options?: { key: string; value: any }[]; // Options for radio/checkbox/select
  order?: number;                 // Field ordering (lower numbers appear first)
  legend?: string;                // Field legend text
  optionsPerRow?: number;         // Number of options per row (radio/checkbox)
}
```

### Layout Configuration

Form layout is configured using the `FormLayoutConfig` interface:

```typescript
interface FormLayoutConfig {
  columns?: number;               // Number of fields per row (default: 1)
  responsiveColumns?: Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', number>>;
  gap?: number;                   // Bootstrap gap class (0-5, default: 3)
  bordered?: boolean;             // Whether to show form border
  margin?: string;                // Bootstrap margin classes (default: 'my-4 mx-auto')
  padding?: string;               // Bootstrap padding classes (default: 'p-4')
}
```

## Usage Examples

### Basic Form

```typescript
import { Component } from '@angular/core';
import { FormConfig } from './interfaces/form-config';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-form-creator',
  template: '<app-form-generator [configrations]="form"></app-form-generator>'
})
export class FormCreator {
  form: FormConfig = {
    legend: 'User Registration',
    fields: [
      {
        key: 'name',
        label: 'Full Name',
        type: 'text',
        order: 1,
        validators: [Validators.required],
        errorMessages: {
          required: 'Name is required'
        }
      },
      {
        key: 'email',
        label: 'Email Address',
        type: 'email',
        order: 2,
        validators: [Validators.required, Validators.email],
        errorMessages: {
          required: 'Email is required',
          email: 'Please enter a valid email'
        }
      }
    ],
    layout: {
      columns: 2,
      bordered: true
    }
  };
}
```

### Advanced Form with Responsive Layout

```typescript
form: FormConfig = {
  legend: 'Advanced Registration Form',
  fields: [
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      order: 1,
      validators: [Validators.required],
      errorMessages: { required: 'Name is required' }
    },
    {
      key: 'age',
      label: 'Age',
      type: 'number',
      order: 2,
      validators: [Validators.required, Validators.min(18)],
      errorMessages: {
        required: 'Age is required',
        min: 'Must be 18 or older'
      }
    },
    {
      key: 'gender',
      label: 'Gender',
      legend: 'Select your gender',
      type: 'radio',
      order: 3,
      optionsPerRow: 3,
      options: [
        { key: 'Male', value: 'male' },
        { key: 'Female', value: 'female' },
        { key: 'Other', value: 'other' }
      ],
      validators: [Validators.required],
      errorMessages: { required: 'Please select a gender' }
    },
    {
      key: 'interests',
      label: 'Interests',
      legend: 'Select your interests',
      type: 'checkbox',
      order: 4,
      optionsPerRow: 2,
      options: [
        { key: 'Sports', value: 'sports' },
        { key: 'Music', value: 'music' },
        { key: 'Reading', value: 'reading' },
        { key: 'Travel', value: 'travel' }
      ]
    }
  ],
  layout: {
    responsiveColumns: {
      xs: 1,  // 1 column on extra small screens
      sm: 2,  // 2 columns on small screens
      md: 2,  // 2 columns on medium screens
      lg: 3   // 3 columns on large screens
    },
    gap: 3,
    bordered: true,
    margin: 'my-5 mx-auto',
    padding: 'p-4'
  }
};
```

### Custom Validation

```typescript
export class FormCreator {
  form: FormConfig = {
    fields: [
      {
        key: 'password',
        label: 'Password',
        type: 'password',
        validators: [Validators.required, Validators.minLength(8)],
        customValidator: [this.passwordStrengthValidator()],
        errorMessages: {
          required: 'Password is required',
          minlength: 'Password must be at least 8 characters',
          weakPassword: 'Password must contain uppercase, lowercase, and number'
        }
      }
    ]
  };

  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);

      return hasUpperCase && hasLowerCase && hasNumeric
        ? null
        : { weakPassword: true };
    };
  }
}
```

## API Reference

### Components

#### FormGeneratorComponent

Main form rendering component.

**Selector:** `app-form-generator`

**Inputs:**
- `configrations: FormConfig` - Form configuration object

**Methods:**
- `getControl(key: string): FormControl` - Get form control by key
- `get groupErrors(): string[]` - Get global form validation errors

### Interfaces

#### FormConfig
Main form configuration interface.

#### FormFieldConfig
Individual field configuration interface.

#### FormLayoutConfig
Form layout and styling configuration interface.

### Validators

The form supports both Angular built-in validators and custom validators:

- `Validators.required`
- `Validators.minLength()`
- `Validators.maxLength()`
- `Validators.pattern()`
- `Validators.email`
- Custom validator functions

## Responsive Breakpoints

The form supports Bootstrap's responsive breakpoints:

- `xs`: Extra small (<576px)
- `sm`: Small (≥576px)
- `md`: Medium (≥768px)
- `lg`: Large (≥992px)
- `xl`: Extra large (≥1200px)
- `xxl`: Extra extra large (≥1400px)

## Styling

The form uses Bootstrap 5 classes for styling:

- Form fields: `form-control`, `form-check`, `form-check-input`, `form-check-label`
- Layout: `row`, `col`, `g-*` (gaps)
- Spacing: `my-*`, `mx-*`, `p-*` (margins and padding)
- Borders: `border`, `rounded`, `shadow-sm`
- Colors: `text-danger` (errors), `bg-white` (background)

## Error Handling

Field-level errors are displayed below each field with Bootstrap alert styling. Global form errors are displayed at the bottom of the form.

Error messages are configured in the `errorMessages` property of each field:

```typescript
errorMessages: {
  required: 'This field is required',
  minlength: 'Minimum length is 8 characters',
  customError: 'Custom error message'
}
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Build the project: `npm run build`
6. Commit your changes: `git commit -am 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on the GitHub repository.

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
