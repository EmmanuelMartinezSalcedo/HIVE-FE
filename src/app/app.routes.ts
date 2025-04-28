import { Routes } from '@angular/router';
import { EmptyComponent } from './empty/empty.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./empty/empty.component').then((m) => m.EmptyComponent),
  },
  {
    path: 'video-details',
    loadComponent: () =>
      import('./video-list/video-list.component').then(
        (m) => m.VideoListComponent
      ),
  },
  {
    path: 'video-details/:id',
    loadComponent: () =>
      import('./video-details/video-details.component').then(
        (m) => m.VideoDetailsComponent
      ),
  },
];
