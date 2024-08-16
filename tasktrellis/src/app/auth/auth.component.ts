import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [],
  template: ` <p>auth works!</p> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
