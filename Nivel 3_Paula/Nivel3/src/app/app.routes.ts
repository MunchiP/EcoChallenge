import { Routes } from '@angular/router';
// Llamado del Intro
import { AnimacionPrincipalComponent } from './Inicio/animacion-principal/animacion-principal.component';
// Llamado del Formulario
import { FormularioComponent } from './Inicio/formulario/formulario.component';
// Llamado del Nivel 1°
import { Educativo1Component } from './n1/educativo1/educativo1.component';
import { Juego1Component } from './n1/juego1/juego1.component';
// Llamado del Nivel 2°
import { Educativo2Component } from './n2/educativo2/educativo2.component';
import { Juego2Component } from './n2/juego2/juego2.component';
// Llamado del Nivel 3°
import { EducativoComponent } from './n3/educativo3/educativo3.component';
import { JuegoComponent } from './n3/juego3/juego3.component';
// import { Juego31Component } from './n3/juego31/juego31.component';
// Llamado del Final
import { FinComponent } from './Inicio/fin/fin.component';

export const routes: Routes = [

    // Intro
    {path: 'Inicio', component: AnimacionPrincipalComponent},
    // Formuario
    {path: "Formulario", component: FormularioComponent},
    // Nivel 1
    {path: 'EducativoNivel1', component: Educativo1Component},
    {path: 'JuegoNivel1', component: Juego1Component},
    // Nivel 2
    {path: 'EducativoNivel2', component: Educativo2Component},
    {path: 'JuegoNivel2', component: Juego2Component},
    // Nivel 3
    {path: 'EducativoNivel3', component: EducativoComponent},
    {path: 'JuegoNivel3', component: JuegoComponent},
    // {path: 'Juego3', component: JuegoComponent},

    // Final
    {path: "Final", component: FinComponent},

    // Ruta error -  ruta por defecto
    {path: '', component: AnimacionPrincipalComponent },
    {path: '**', component: AnimacionPrincipalComponent}
];
