import { Routes } from '@angular/router';

export const tripsRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/trips-list/trips-list')
        .then((m) => m.TripsList),
  },
  {
    path: 'new',
    loadComponent: () =>
      import('./pages/trip-create/trip-create')
        .then((m) => m.TripCreate),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./pages/trip-details/trip-details')
        .then((m) => m.TripDetails),
  },
];