// Combina los imports necesarios de ambas versiones
import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // <-- Necesario para tu formulario
import { provideClientHydration, withEventReplay } from '@angular/platform-browser'; // <-- De la versión de Paula

import { routes } from './app.routes'; // Import de rutas

export const appConfig: ApplicationConfig = {
  providers: [
    // Mantenemos los providers estándar de la versión de Paula
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),

    // Mantenemos el provider del router
    provideRouter(routes),

    // Mantenemos el provider de ReactiveFormsModule de tu versión (¡MUY IMPORTANTE!)
    importProvidersFrom(ReactiveFormsModule)

    // Aquí podrías añadir otros providers globales más adelante,
    // como provideHttpClient(withFetch()) si necesitas hacer llamadas API.
  ]
};