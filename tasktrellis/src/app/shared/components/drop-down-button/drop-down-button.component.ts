import {
  Component,
  ChangeDetectionStrategy,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-drop-down-button',
  standalone: true,
  imports: [MatButton, MatIconModule],
  template: `
    <button
      [class]="
        'flex flex-row-reverse gap-4 justify-center items-center !rounded-md !w-full !p-2 !text-slate-100 hover:bg-slate-600 transition ml-2' +
        class
      "
      mat-button
      (click)="isDropDownOpen.set(!isDropDownOpen())"
    >
      <ng-content></ng-content>
      <mat-icon [className]="'text-lg'">keyboard_arrow_down</mat-icon>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownButtonComponent {
  @Input() class!: string;

  public isDropDownOpen: WritableSignal<boolean> = signal(false);

  public toggleDropDown() {
    this.isDropDownOpen.set(!this.isDropDownOpen());
  }
}
