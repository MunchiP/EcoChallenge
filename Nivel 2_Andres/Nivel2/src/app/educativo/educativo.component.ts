// ===== Contenido para: educativo.component.ts =====

import { Component, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // <--- Importa RouterModule aquí también

@Component({
  selector: 'app-educativo',
  templateUrl: './educativo.component.html',
  styleUrls: ['./educativo.component.css'],
  standalone: true, // <--- Asegúrate que EducativoComponent también sea standalone si CaminoReciclajeComponent lo es

})
export class EducativoComponent implements OnDestroy {

  constructor(private router: Router) { }
  ngOnDestroy(): void {
    
  }
  IrAlJuego(){
    this.router.navigate(['/camino-reciclaje'])
  }


}