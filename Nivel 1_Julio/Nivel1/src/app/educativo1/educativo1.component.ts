import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-educativo1',
  templateUrl: './educativo1.component.html',
  styleUrl: './educativo1.component.css',
  standalone: true, 
})
export class Educativo1Component implements OnDestroy {
  constructor(private router: Router) { }

  ngOnDestroy(): void {
    console.log('El componente Educativo1 se ha destruido');
  }

  GoJuego1() {
    this.router.navigate(['/juego1']);
  }
}