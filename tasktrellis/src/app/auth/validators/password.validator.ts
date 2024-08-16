import { ValidatorFn, Validators } from '@angular/forms';

/**
 *
 * @type {ValidatorFn}
 * password must contain 1 number (0-9)
 * password must contain 1 uppercase letters
 * password must contain 1 lowercase letters
 * password must contain 1 non-alpha numeric number
 * password is 8-16 characters with no space
 */
export const passwordValidator: ValidatorFn = Validators.pattern(
  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
);
