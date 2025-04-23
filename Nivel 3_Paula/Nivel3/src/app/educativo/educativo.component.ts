import { Component } from '@angular/core';

@Component({
  selector: 'app-educativo',
  imports: [],
  templateUrl: './educativo.component.html',
  styleUrl: './educativo.component.css'
})
export class EducativoComponent {

  reproduceAudio(ruta: string){
    const audio = new Audio();
    audio.src = ruta;
    audio.load();
    audio.play();
  }
}

