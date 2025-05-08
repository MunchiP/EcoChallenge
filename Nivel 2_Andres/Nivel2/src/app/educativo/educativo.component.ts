// ===== Contenido para: educativo.component.ts =====

import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // <--- Importa RouterModule aquí también

@Component({
  selector: 'app-educativo',
  templateUrl: './educativo.component.html',
  styleUrls: ['./educativo.component.css'],
  standalone: true, // <--- Asegúrate que EducativoComponent también sea standalone si CaminoReciclajeComponent lo es
  imports: [ // <--- Añade imports si EducativoComponent es standalone
    RouterModule // <--- ¡Importa RouterModule aquí!
    // CommonModule si usas directivas comunes como NgIf, NgFor etc.
  ]
})
export class EducativoComponent {

  constructor(private router: Router) { }

  irAlJuego(): void {
    console.log('Navegando hacia el juego...');

    // --- ¡IMPORTANTE! ---
    // Aquí es donde le dices a Angular a qué ruta ir.
    // Debes usar una de las rutas que DEFINISTE en app.routes.ts para CaminoReciclajeComponent.
    // En tu app.routes.ts tienes:
    // { path: 'camino', component: CaminoReciclajeComponent },
    // { path: 'juego-reciclaje', component: CaminoReciclajeComponent }
    // Puedes usar CUALQUIERA de esas dos rutas para navegar al componente del juego.
    // Usemos '/camino' por simplicidad, ya que es más corto.

    this.router.navigate(['/camino']); // <--- Cambia la ruta a '/camino' o '/juego-reciclaje'
  }

}