import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-project-list-dropdown',
  standalone: true,
  imports: [],
  template: `
    <div class="w-full h-80 bg-slate-800 text-slate-300 rounded-md p-5">
      project-list-dropdown works!
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectListDropdownComponent {}
