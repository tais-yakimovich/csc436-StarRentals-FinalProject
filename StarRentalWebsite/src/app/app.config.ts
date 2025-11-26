import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// PrimeNG global config
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

// Your routes
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // Animations (required for many PrimeNG components)
    provideAnimationsAsync(),

    // PrimeNG Theme config
    providePrimeNG({
      theme: {
        preset: Aura,
        options: { darkModeSelector:'.my-app-dark'

        }
      }
    })
  ]
};
