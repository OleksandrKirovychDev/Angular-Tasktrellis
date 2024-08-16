import { Directive, inject, Inject, Injector, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

import { AbstractValueAccessor } from './abstract-value-accessor.abstraction';
import { ValidationErrorPipe } from '../../../pipes/validation-error.pipe';

@Directive()
export abstract class AbstractInputHandlerAccessor<T>
  extends AbstractValueAccessor<T>
  implements OnInit
{
  private _ngControl!: NgControl;

  private _errorValidationPipe = inject(ValidationErrorPipe);

  constructor(@Inject(Injector) private injector: Injector) {
    super();
  }

  public ngOnInit(): void {
    this._defineNgControl();
  }

  public get hasError(): boolean {
    return !!(this._ngControl.invalid && this._ngControl.dirty);
  }

  private _defineNgControl(): void {
    this._ngControl = this.injector.get(NgControl);
  }

  public get error(): string | null {
    return this._errorValidationPipe.transform(this._ngControl.errors);
  }
}
