import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JuegoComponent } from "./juego/juego.component";
import { EducativoComponent } from "./educativo/educativo.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EducativoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nivel3';
}
