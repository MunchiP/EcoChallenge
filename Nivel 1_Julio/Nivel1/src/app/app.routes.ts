import { Routes } from '@angular/router';
import { Educativo1Component } from './educativo1/educativo1.component';
import { Juego1component } from './juego1/juego1.component';

export const routes: Routes = [
  { path: 'educativo1', component: Educativo1Component },
  { path: 'juego1', component: Juego1component },
  { path: '', redirectTo: '/educativo1', pathMatch: 'full' }, // Ruta por defecto
];