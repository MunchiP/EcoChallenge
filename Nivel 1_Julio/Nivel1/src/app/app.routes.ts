import { Routes } from '@angular/router';
import { Educativo1Component } from './educativo1/educativo1.component';
import { Juego1component } from './juego1/juego1.component';
import { EducativoComponent } from './../../../../Nivel 2_Andres/Nivel2/src/app/educativo/educativo.component';
import {CaminoReciclajeComponent} from './../../../../Nivel 2_Andres/Nivel2/src/app/camino-reciclaje/camino-reciclaje.component';
export const routes: Routes = [
  { path: 'educativo1', component: Educativo1Component },
  { path: 'juego1', component: Juego1component },
  { path: 'educativo2', component: EducativoComponent},
  { path: 'camino-reciclaje', component: CaminoReciclajeComponent},

   { path: '', redirectTo: '/educativo1', pathMatch: 'full' } // Ruta por defecto
];