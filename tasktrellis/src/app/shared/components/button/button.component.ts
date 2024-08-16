import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  TButtonAction,
  TButtonSize,
  TButtonState,
} from './enums/button-config.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  template: `
    <div class="wrapper">
      <button
        [disabled]="disabled"
        [ngClass]="['action--' + action, 'type--' + state, 'size--' + size]"
        [type]="type"
      >
        {{ label }}
        <ng-content></ng-content>
      </button>
    </div>
  `,
  styles: [
    `
      button {
        border-radius: 4px;
        padding: 12px 16px;
        background: theme('colors.blue.500');
        color: theme('colors.white');
        font-size: 14px;
        font-weight: 700;
        line-height: 16px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:disabled {
          cursor: not-allowed;
          color: theme('colors.neutral.700') !important;
          border: 1px solid theme('colors.grey.400') !important;
          background: theme('colors.grey.300') !important;
        }

        &.action--secondary {
          background: theme('colors.primary.100');
          border: 1px solid theme('colors.primary.200');
          color: theme('colors.primary.200');

          &:hover {
            background: theme('colors.white');
          }

          &:active {
            background: theme('colors.white');
            border: 1px solid theme('colors.blue.400');
          }
        }

        &:hover {
          background: theme('colors.primary.300');
        }

        &:active {
          background: theme('colors.blue.400');
        }

        &.size--M {
          padding: 10px 16px;
        }

        &.size--S {
          padding: 8px 16px;
        }

        &.type--success {
          background: theme('colors.success.600');

          &:hover {
            background: theme('colors.success.500');
          }

          &:active {
            background: theme('colors.success.700');
          }

          &.action--secondary {
            background: theme('colors.success.100');
            border: 1px solid theme('colors.success.200');
            color: theme('colors.success.600');

            &:hover {
              background: theme('colors.white');
            }

            &:active {
              background: theme('colors.white');
              color: theme('colors.blue.700');
              border: 1px solid theme('colors.blue.700');
            }
          }
        }

        &.type--error {
          background: theme('colors.error.500');

          &:hover {
            background: theme('colors.error.400');
          }

          &:active {
            background: theme('colors.error.700');
          }

          &.action--secondary {
            background: theme('colors.error.100');
            border: 1px solid theme('colors.error.200');
            color: theme('colors.error.500');

            &:hover {
              background: theme('colors.white');
            }

            &:active {
              background: theme('colors.white');
              color: theme('colors.error.700');
              border: 1px solid theme('colors.error.700');
            }
          }
        }
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label!: string;
  @Input() state: TButtonState = 'normal';
  @Input() action: TButtonAction = 'primary';
  @Input() size: TButtonSize = 'M';
  @Input() disabled!: boolean;
  @Input() type: 'text' | 'submit' = 'submit';
  @Input() icon?: {
    value: string;
    position?: 'start' | 'end';
  };
}
