import {
  ChangeDetectionStrategy,
  Component,
  signal,
  WritableSignal,
} from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DropDownComponent } from '../../shared/components/drop-down/drop-down.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ProjectListDropdownComponent } from '../project-list-dropdown/project-list-dropdown.component';
import { DropDownButtonComponent } from '../../shared/components/drop-down-button/drop-down-button.component';
import { PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    DropDownComponent,
    CdkOverlayOrigin,
    ProjectListDropdownComponent,
    DropDownButtonComponent,
    PortalModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  protected isOpen: WritableSignal<boolean> = signal(false);
}
