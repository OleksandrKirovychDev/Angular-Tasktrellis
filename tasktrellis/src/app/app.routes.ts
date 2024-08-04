import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    children: [
      {
        path: 'boards',
        loadChildren: () =>
          import('./board/board.routes').then((r) => r.boardRoutes),
      },
    ],
  },
];
