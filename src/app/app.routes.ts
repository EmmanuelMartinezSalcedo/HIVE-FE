import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'video-details/:id',
    loadComponent: () =>
      import('./video-details/video-details.component').then(
        (m) => m.VideoDetailsComponent
      ),
  },
];
