import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'app-drop-down',
  standalone: true,
  imports: [OverlayModule, PortalModule],
  template: `
    <ng-template cdkPortal>
      <ng-content></ng-content>
    </ng-template>
  `,
  styleUrl: './drop-down.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownComponent {
  @Output() openModalOutput = new EventEmitter<void>();

  @ViewChild(CdkPortal) portal!: CdkPortal;

  private overlay = inject(Overlay);

  public openModal() {
    const overlayRef = this.overlay.create();
    overlayRef.attach(this.portal);
  }
}
