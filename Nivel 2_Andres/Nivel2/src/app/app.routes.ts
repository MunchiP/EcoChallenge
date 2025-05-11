import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importar Providers

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // <-- 1. Importa esto


// Componentes
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component'; // Formulario
import { EducativoComponent } from './educativo/educativo.component'; // ¡IMPORTAMOS EL NUEVO! Asegúrate que la ruta './educativo/educativo.component' sea correcta.
import { CaminoReciclajeComponent } from './camino-reciclaje/camino-reciclaje.component';


// Rutas
export const routes: Routes = [

  { path: '', component: RegistroUsuarioComponent },
  { path: 'educativo', component: EducativoComponent },
  { path: 'camino-reciclaje', component: CaminoReciclajeComponent }


];
//Providers

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // <-- 2. Añade esta función al array de providers
  ]
};


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }