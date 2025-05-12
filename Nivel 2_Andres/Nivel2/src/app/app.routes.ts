
import { RouterModule, Routes } from '@angular/router';


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