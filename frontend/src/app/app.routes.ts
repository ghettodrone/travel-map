import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'travelMap/dashboard',
  },
  {
    path: 'travelMap',
    loadComponent: () =>
      import('./layout/layout/layout').then(
        (m) => m.Layout,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import(
            './modules/dashboard/pages/dashboard/dashboard'
          ).then((m) => m.Dashboard),
      },
      {
        path: 'trips',
        loadChildren: () =>
          import('./modules/trips/trips.routes')
            .then((m) => m.tripsRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'travelMap/dashboard',
  },
];