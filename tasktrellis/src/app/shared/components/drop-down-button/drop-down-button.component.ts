import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-drop-down-button',
  standalone: true,
  imports: [MatButton],
  template: `
    <button [class]="class" mat-button (click)="openDropDown.emit()">
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownButtonComponent {
  @Output() openDropDown: EventEmitter<void> = new EventEmitter<void>();

  @Input() class!: string;
}
