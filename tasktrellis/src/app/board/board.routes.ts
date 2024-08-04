import { Routes } from '@angular/router';
import { BoardBaseComponent } from './board-base.component';

export const boardRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: BoardBaseComponent,
  },
  {
    path: 'views',
    children: [
      {
        path: 'kanban',
        loadComponent: () =>
          import('./views/kanban/kanban.component').then(
            (c) => c.KanbanComponent
          ),
      },
    ],
  },
];
