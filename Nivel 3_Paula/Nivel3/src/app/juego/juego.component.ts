import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';


// Tipar los objetos que están en el array, para declarar las propiedades que tendrán.
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
  imports: [],
  templateUrl: './juego.component.html',
  styleUrl: './juego.component.css'
})

export class JuegoComponent implements OnInit {

    @ViewChild('gameSpace') gameSpace!: ElementRef;
    player = {x: 100, y: 100, size:40};
    trashBags: TrashBag[] = [];
    fishes: Fish[] = [];
    trashInterval: any;
    fishInterval: any;


    // Como elOnInit se ejecuta cuando el componente ya está cargado en pantalla, lo uso para iniciar los objetos  del juego
    // El primer método crea las bolsas de basura y el segundo comienza el movimiento de los peces.
    ngOnInit(){
      this.startSpawningTrash();
      this.startFishMovement();
    }

      // Metod  para crear bolsas de basura de manera "random" entre las especificaciones de la pantalla cada 3 segundos
      // Especificación de las medidas:
      // El display del juego es 1280 * 720
      // El tamaño de la bolsa de la basura será de 40px
      // Cómo puede que el punto random que genere sea: 1280 se le reduce el tamaño del objeto para que no lo cree por fuera
    startSpawningTrash(){
      this.trashInterval = setInterval(() => {
        const x = Math.random() * (1280 - 40);
        const y = Math.random() * (720 - 40);
        this.trashBags.push({x, y});
      }, 3000)
    }

      // Aquí por ejemplo varía el tamaño del pez que es de 50
      // Aunque también se especificó el tamaño en css, aquí se agrega por el tamaño de la coordenada del
    startFishMovement() {
      for (let i = 0; i < 10; i++) {
        this.fishes.push({
          x: Math.random() * (1280 - 50),
          y: Math.random() * (720 - 50),
          direction: Math.random() < 0.5 ? -1 : 1
        });
      }
      //Este foreach en particular se hace para que el pez se mueva cada 50 milisegundos
      this.fishInterval = setInterval(() => {
        this.fishes.forEach(fish => {
          //cambia la posición del pez en x, fish.directión es -1 o 1, el 2 son los pixeles que se mueve
          fish.x += fish.direction * 2;
          // si el pez llega a un borde de lo establecido gira (1 a la derecha -1 a la izquierda)
          if (fish.x <= 0 || fish.x >= 1240) fish.direction *= -1;
        });
      }, 50);
    }

    @HostListener('document:keydown', ['$event'])
    onKeydown(event: KeyboardEvent): void {
      const speed = 10;
      switch (event.key) {
        case 'ArrowUp': this.player.y = Math.max(this.player.y - speed, 0); break;
        case 'ArrowDown': this.player.y = Math.min(this.player.y + speed, 680); break;
        case 'ArrowLeft': this.player.x = Math.max(this.player.x - speed, 0); break;
        case 'ArrowRight': this.player.x = Math.min(this.player.x + speed, 1240); break;
      }
    }

    checkTrashCollision(){
      this.trashBags = this.trashBags.filter(bag => {
        const dx = bag.x - this.player.x;
        const dy = bag.y - this.player.y;
        return Math.sqrt(dx*dx + dy*dy) > this.player.size;
      });
    }

    finishGame(){
      alert("Felicidades, has limpiazo el mar");
      clearInterval(this.trashInterval);
      clearInterval(this.fishInterval);
    }
  }

