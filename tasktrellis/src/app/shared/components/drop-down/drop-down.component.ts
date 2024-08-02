import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  WritableSignal,
} from '@angular/core';
import {
  CdkOverlayOrigin,
  FlexibleConnectedPositionStrategyOrigin,
  OverlayModule,
} from '@angular/cdk/overlay';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [OverlayModule],
  template: `
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="isDropDownOpen()"
      (overlayOutsideClick)="clickOutside.emit()"
      [cdkConnectedOverlayOffsetY]="offsetY"
    >
      <ng-content></ng-content>
    </ng-template>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownComponent {
  @Output() clickOutside = new EventEmitter<void>();

  @Input({ required: true }) trigger!:
    | CdkOverlayOrigin
    | FlexibleConnectedPositionStrategyOrigin;
  @Input({ required: true }) isDropDownOpen!: WritableSignal<boolean>;

  @Input() offsetY = 5;
}
