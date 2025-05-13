import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animacion-principal',
  imports: [],
  templateUrl: './animacion-principal.component.html',
  styleUrl: './animacion-principal.component.css'
})
export class AnimacionPrincipalComponent {

  constructor(private router: Router) {}

  onVideoEnd() {
    const container = document.querySelector('.fullscreen-video-container');
    if (container) {
      container.classList.add('fade-out');
      setTimeout(() => {
        this.router
        .navigate(['/Formulario']);
      }, 1000);
    } else {
      this.router.navigate(['/Formulario']);
    }
  }
  
}
