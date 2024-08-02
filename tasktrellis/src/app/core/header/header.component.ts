import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DropDownComponent } from '../../shared/components/drop-down/drop-down.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ProjectListDropdownComponent } from '../project-list-dropdown/project-list-dropdown.component';
import { DropDownButtonComponent } from '../../shared/components/drop-down-button/drop-down-button.component';
import { PortalModule } from '@angular/cdk/portal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    DropDownComponent,
    ProjectListDropdownComponent,
    DropDownButtonComponent,
    PortalModule,
    OverlayModule,
  ],
  template: `
    <mat-toolbar role="heading" class="!bg-slate-900 gap-2" [className]="">
      <h1 class="text-slate-100 size-7 w-fit !mr-5">TASKTRELLIS</h1>

      <app-drop-down-button
        #workspacesDropDownButton
        cdkOverlayOrigin
        #workspacesBtnTrigger="cdkOverlayOrigin"
      >
        Workspaces
      </app-drop-down-button>

      <app-drop-down-button
        #recentDropDownButton
        cdkOverlayOrigin
        #recentBtnTrigger="cdkOverlayOrigin"
      >
        Recent
      </app-drop-down-button>

      <app-drop-down-button
        #starredDropDownButton
        cdkOverlayOrigin
        #starredBtnTrigger="cdkOverlayOrigin"
      >
        Starred
      </app-drop-down-button>

      <app-drop-down-button
        #templatesDropDownButton
        cdkOverlayOrigin
        #templatesBtnTrigger="cdkOverlayOrigin"
      >
        Templates
      </app-drop-down-button>
    </mat-toolbar>

    <app-drop-down
      (clickOutside)="recentDropDownButton.toggleDropDown()"
      [isDropDownOpen]="recentDropDownButton.isDropDownOpen"
      [trigger]="recentBtnTrigger"
    >
      <app-project-list-dropdown></app-project-list-dropdown>
    </app-drop-down>

    <app-drop-down
      (clickOutside)="workspacesDropDownButton.toggleDropDown()"
      [isDropDownOpen]="workspacesDropDownButton.isDropDownOpen"
      [trigger]="workspacesBtnTrigger"
    >
      <app-project-list-dropdown></app-project-list-dropdown>
    </app-drop-down>

    <app-drop-down
      (clickOutside)="starredDropDownButton.toggleDropDown()"
      [isDropDownOpen]="starredDropDownButton.isDropDownOpen"
      [trigger]="starredBtnTrigger"
    >
      <app-project-list-dropdown></app-project-list-dropdown>
    </app-drop-down>

    <app-drop-down
      (clickOutside)="templatesDropDownButton.toggleDropDown()"
      [isDropDownOpen]="templatesDropDownButton.isDropDownOpen"
      [trigger]="templatesBtnTrigger"
    >
      <app-project-list-dropdown></app-project-list-dropdown>
    </app-drop-down>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
