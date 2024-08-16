import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationError',
  standalone: true,
})
export class ValidationErrorPipe implements PipeTransform {
  getErrorMessage(error: string, length = 0): string {
    const errorMessages = {
      required: 'Field is required',
      minlength: `Length should be at least ${length}`,
      maxlength: `Length should be max ${length}`,
      email: 'You need to provide valid email',
      default: 'Field is not valid',
    };
    return (
      errorMessages[error as keyof typeof errorMessages] ||
      errorMessages['default']
    );
  }

  transform(errors: ValidationErrors | null): string | null {
    if (errors) {
      for (const [key, value] of Object.entries(errors)) {
        if (value) {
          return this.getErrorMessage(key, value.requiredLength);
        }
      }
    }
    return null;
  }
}
