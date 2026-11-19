import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),

    providePrimeNG({
      license: 'eyJpZCI6IjFiMjFjMDlhLTg3ODgtNGFhMi04NjkyLTgwMTUwODJjM2NmOCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3OTQ3MzI5NzIsImV4cCI6MTgyNjI2ODk3Mn0.QVAIjZFGkoxkd1NHF7iX3ABsfJPNu-v3BqJvP6rneVf5pLT1ufiMP6Er3Hsz4vwv3W-KNIxomZlcuVs_Y4FxAw',
      theme: {
        preset: Aura,
      },
    }),
  ]
};
