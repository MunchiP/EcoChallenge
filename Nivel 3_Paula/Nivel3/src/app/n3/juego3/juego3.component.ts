import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
// Ruteo
// import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
// Importando Material y Common aquí usando pra ngFor
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


interface TrashBag {
  x: number;
  y: number;
}

interface Fish {
  x: number;
  y: number;
  direction: number;
}

@Component({
  selector: 'app-juego',
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './juego3.component.html',
  styleUrl: './juego3.component.css'
})
export class JuegoComponent implements OnInit {


  @ViewChild('gameSpace') gameSpace!: ElementRef;
  player = { x: 100, y: 100, size: 40 };
  trashBags: TrashBag[] = [];
  fishes: Fish[] = [];
  trashInterval: any;
  fishInterval: any;

    //Router
    constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.startSpawningTrash();
      this.startFishMovement();
    });
  }

  startSpawningTrash() {
    const gameWidth = this.gameSpace.nativeElement.clientWidth;
    const gameHeight = this.gameSpace.nativeElement.clientHeight;
  
    this.trashInterval = setInterval(() => {
      const x = Math.random() * (gameWidth - 30); // bolsa mide 30px
      const y = Math.random() * (gameHeight - 30);
      this.trashBags.push({ x, y });
    }, 3000);
  }

  startFishMovement() {
    const gameWidth = this.gameSpace.nativeElement.clientWidth;
    const gameHeight = this.gameSpace.nativeElement.clientHeight;
  
    for (let i = 0; i < 10; i++) {
      this.fishes.push({
        x: Math.random() * (gameWidth - 50),
        y: Math.random() * (gameHeight - 20),
        direction: Math.random() < 0.5 ? -1 : 1
      });
    }
  
    this.fishInterval = setInterval(() => {
      this.fishes.forEach(fish => {
        fish.x += fish.direction * 2;
        // cambiar dirección si toca un borde
        if (fish.x <= 0 || fish.x >= gameWidth - 50) {
          fish.direction *= -1;
        }
      });
    }, 50);
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    const speed = 10;

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault(); // Previene el scroll de la página
    }

    switch (event.key) {
      case 'ArrowUp': this.player.y = Math.max(this.player.y - speed, 0); break;
      case 'ArrowDown': this.player.y = Math.min(this.player.y + speed, 360 - this.player.size); break;
      case 'ArrowLeft': this.player.x = Math.max(this.player.x - speed, 0); break;
      case 'ArrowRight': this.player.x = Math.min(this.player.x + speed, 640 - this.player.size); break;
    }

    this.checkTrashCollision(); // Detecta colisiones tras moverse
  }

  checkTrashCollision() {
    // Detección de colisiones tipo caja (collider box)
    this.trashBags = this.trashBags.filter(bag => {
      return !(
        this.player.x < bag.x + 30 &&
        this.player.x + this.player.size > bag.x &&
        this.player.y < bag.y + 30 &&
        this.player.y + this.player.size > bag.y
      );
    });
  }

  finishGame() {
    // alert("Felicidades, has limpiado el mar");
    clearInterval(this.trashInterval);
    clearInterval(this.fishInterval);
    this.router.navigate(['/Final']);
  }
}