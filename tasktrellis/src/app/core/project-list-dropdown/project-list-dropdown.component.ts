import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-project-list-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './project-list-dropdown.component.html',
  styleUrl: './project-list-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListDropdownComponent {}
