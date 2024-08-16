import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';

import { ValidationErrorPipe } from '../../pipes/validation-error.pipe';
import { AbstractInputHandlerAccessor } from '../form-control/models/abstract-input-handler-accessor.abstraction';
import { BaseFormControlAbstraction } from '../form-control/models/base-form-control.abstraction';
import { IFormControlTooltip } from '../form-control/types/form-control-tooltip.type';
import { TFormFieldType } from './types/form-field.type';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  standalone: true,
  template: `<mat-form-field [floatLabel]="'always'" class="w-full">
    <input
      #input
      (keyup)="setValue(input.value)"
      [value]="value"
      [disabled]="disabled"
      [placeholder]="placeholder"
      matInput
      [type]="type === 'password' ? (hide ? 'password' : 'text') : type"
    />
    @if(prefix) {<span matPrefix>{{ prefix }}</span
    >} @if(type === 'password') {
    <button
      mat-icon-button
      matSuffix
      (click)="hide = !hide"
      [attr.aria-label]="'Hide password'"
      [attr.aria-pressed]="hide"
    >
      <mat-icon>{{ hide ? 'visibility_off' : 'visibility' }}</mat-icon>
    </button>
    }
  </mat-form-field> `,
  imports: [MatFormField, MatIcon, MatFormFieldModule, MatInputModule],
  providers: [
    ValidationErrorPipe,
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    },
    {
      provide: BaseFormControlAbstraction,
      useExisting: InputComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent
  extends AbstractInputHandlerAccessor<string>
  implements BaseFormControlAbstraction
{
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() description!: string;
  @Input() icon!: string;
  @Input() tooltipTitle!: string;
  @Input() tooltip?: IFormControlTooltip;
  @Input() type: TFormFieldType = 'text';
  @Input() isTransparent?: boolean;
  @Input() prefix?: string;

  hide = true;

  setValue(value: string) {
    if (this.isDisabled) return;

    this.value = value;
    this.onChange(value);
    this.onTouched();
  }
}
