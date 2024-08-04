import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-board-base',
  standalone: true,
  imports: [MatButton, RouterModule],
  template: ` <button mat-button routerLink="views/kanban">
    Kanban Board
  </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardBaseComponent {}
