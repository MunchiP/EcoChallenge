import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // <-- Solo este import es necesario aquí arriba

@Component({
  selector: 'app-root',
  standalone: true, // <-- Mantenemos standalone
  imports: [ RouterOutlet ], // <-- Solo RouterOutlet es necesario para la plantilla
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nivel2'; // Puedes mantener o ajustar el título si quieres
}