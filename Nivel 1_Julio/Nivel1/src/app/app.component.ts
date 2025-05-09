import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { Educativo1Component } from "./educativo1/educativo1.component";
import { Juego1component} from './juego1/juego1.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Nivel1';
}
