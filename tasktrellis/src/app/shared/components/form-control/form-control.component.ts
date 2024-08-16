import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';

import { BaseFormControlAbstraction } from './models/base-form-control.abstraction';
import { IFormControlTooltip } from './types/form-control-tooltip.type';

@Component({
  selector: 'app-form-control',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatTooltipModule],
  template: `<div class="form-control-wrapper">
    <div class="flex justify-between items-center">
      <mat-label>{{ label }}</mat-label>
      <p
        class="tooltip !text-blue-500 !font-light"
        *ngIf="tooltip"
        [matTooltip]="tooltip.content"
      >
        {{ tooltip.title }}
      </p>
    </div>

    <div
      class="content-wrapper"
      [ngClass]="{
        disabled: isDisabled,
        'has-error': hasError,
        'no-description': !description,
        'transparent-bg': isTransparent
      }"
    >
      <ng-content></ng-content>
    </div>

    <mat-error *ngIf="hasError">{{ error }}</mat-error>
    <mat-hint *ngIf="description && !hasError">{{ description }}</mat-hint>
  </div> `,
  styles: [
    `
      $primary: theme('colors.neutral.800');
      $secondary: theme('colors.neutral.700');
      $error: theme('colors.error.500');
      $focus-shadow: theme('colors.blue.500');
      $field-shadow: theme('colors.neutral.200');

      :host {
        display: block;
        width: 100%;

        .form-control-wrapper {
          mat-label,
          .tooltip {
            font-size: 12px;
            font-weight: 700;
            line-height: 16px;
            margin-bottom: 4px;
            color: $primary;
          }

          mat-error,
          mat-hint {
            font-size: 12px;
          }

          &::ng-deep {
            .content-wrapper > *:first-child {
              width: 100%;
              display: block;
            }

            .content-wrapper .mat-mdc-text-field-wrapper {
              background: theme('colors.white');
            }

            .content-wrapper.disabled {
              .mat-mdc-text-field-wrapper,
              ng-select.custom .ng-select-container {
                background: theme('colors.grey.300') !important;

                input,
                & {
                  color: theme('colors.neutral.300') !important;
                  cursor: not-allowed;
                }
              }
            }

            .mat-mdc-form-field {
              width: 100%;
            }

            .mat-mdc-form-field-subscript-wrapper {
              display: none;
            }

            .mdc-text-field,
            .mdc-text-field--no-label:not(.mdc-text-field--outlined):not(
                .mdc-text-field--textarea
              )
              .mat-mdc-form-field-infix {
              padding: 0;
            }

            .mat-mdc-form-field-infix {
              min-height: unset;
              width: unset;
            }

            .has-error {
              .mat-mdc-text-field-wrapper,
              ng-select.custom .ng-select-container {
                -webkit-box-shadow: inset 0 0 0 1px $error;
                -moz-box-shadow: inset 0 0 0 1px $error;
                box-shadow: inset 0 0 0 1px $error;
                border: 1px solid $error;

                &.mdc-text-field--focused {
                  -webkit-box-shadow: inset 0 0 0 2px $error;
                  -moz-box-shadow: inset 0 0 0 2px $error;
                  box-shadow: inset 0 0 0 2px $error;
                  border: 1px solid $error;
                }
              }

              .mat-mdc-form-field-hint-wrapper mat-hint {
                font-size: 12px;
                line-height: 16px;
                color: $error;
              }
            }

            .mat-mdc-text-field-wrapper {
              background: theme('colors.white');
              border-radius: 4px;
              -webkit-box-shadow: inset 0 0 0 1px $field-shadow;
              -moz-box-shadow: inset 0 0 0 1px $field-shadow;
              box-shadow: inset 0 0 0 1px $field-shadow;
              transition: box-shadow 0.3s ease;
              overflow: hidden;

              &.mdc-text-field--focused {
                -webkit-box-shadow: inset 0 0 0 2px $focus-shadow;
                -moz-box-shadow: inset 0 0 0 2px $focus-shadow;
                box-shadow: inset 0 0 0 2px $focus-shadow;
              }

              input,
              textarea,
              mat-select {
                padding: 10px 16px;
                font-size: 14px;
                color: $primary !important;

                &::placeholder {
                  color: theme('colors.neutral.700');
                }
              }

              .no-description .mat-mdc-form-field-subscript-wrapper,
              .mdc-line-ripple,
              .mat-mdc-form-field-focus-overlay {
                display: none;
              }

              .mat-mdc-form-field-hint-wrapper {
                padding: 0;
                margin-top: 4px;

                mat-hint {
                  font-size: 12px;
                  line-height: 16px;
                  color: theme('colors.neutral.700');
                }
              }

              .mat-mdc-form-field-icon-prefix span {
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 10px 9px;
                line-height: 20px;
                min-width: 62px;
                min-height: 44px;
                background: theme('colors.grey.600');
                color: theme('colors.grey.700');
                transition: box-shadow 0.3s ease;
              }

              .mdc-text-field--focused .mat-mdc-form-field-icon-prefix span {
                -webkit-box-shadow: inset 0 0 0 2px $focus-shadow;
                -moz-box-shadow: inset 0 0 0 2px $focus-shadow;
                box-shadow: inset 0 0 0 2px $focus-shadow;
              }

              .mat-mdc-form-field-icon-suffix {
                padding-right: 12px;
              }
            }
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormControlComponent {
  @ContentChild(BaseFormControlAbstraction)
  protected formControl!: BaseFormControlAbstraction;

  public get error(): string {
    return this.formControl.error ?? '';
  }

  public get hasError(): boolean {
    return this.formControl.hasError;
  }

  public get label(): string {
    return this.formControl.label;
  }

  public get isTransparent(): boolean {
    return !!this.formControl.isTransparent;
  }

  public get description(): string {
    return this.formControl.description || '';
  }

  public get isDisabled(): boolean {
    return this.formControl.isDisabled;
  }

  public get tooltip(): IFormControlTooltip | null {
    if (!this.formControl.tooltip) return null;

    const { title, content } = this.formControl.tooltip;
    return {
      title: title && title.trim() ? title : 'Details',
      content,
    };
  }
}
