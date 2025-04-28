import { Routes } from '@angular/router';
import { EducativoComponent } from './educativo/educativo.component';
import { JuegoComponent } from './juego/juego.component';
import { AnimacionPrincipalComponent } from './Inicio/animacion-principal/animacion-principal.component';

export const routes: Routes = [

    {path: 'EducativoNivel3', component: EducativoComponent},
    {path: 'JuegoNivel3', component: JuegoComponent},
    {path: 'Inicio', component: AnimacionPrincipalComponent},
    {path: '', component: AnimacionPrincipalComponent },
    {path: '**', component: AnimacionPrincipalComponent}
];
