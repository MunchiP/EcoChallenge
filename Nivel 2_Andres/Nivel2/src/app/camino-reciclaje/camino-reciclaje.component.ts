import { Component, HostListener, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core'; // <--- Añadido NgZone
import { CommonModule } from '@angular/common';



interface Basura {
  x: number;
  y: number;
  recogida: boolean;
  color: 'verde' | 'negra' | 'blanca';
  isCarried: boolean;
  imageSrc?: string; // <--- Si usaste esta propiedad para el background-image

}

@Component({
  selector: 'app-camino-reciclaje',
  templateUrl: './camino-reciclaje.component.html',
  styleUrls: ['./camino-reciclaje.component.css'],
  standalone: true, // <--- Añade esto para marcarlo como Standalone
  imports: [CommonModule]
})
export class CaminoReciclajeComponent implements OnInit {
  personajeX = 50;
  personajeY = 50;
  personajeWidth = 50; // Coincide con CSS .personaje width
  personajeHeight = 50; // Coincide con CSS .personaje height

  basuras: Basura[] = [];
  carriedBasura: Basura | null = null; // <--- AÑADIDO: Referencia a la basura que el personaje lleva

  readonly gameAreaWidth = 1280;
  readonly gameAreaHeight = 720;
  readonly basuraWidth = 30; // Coincide con CSS .basura width
  readonly basuraHeight = 30; // Coincide con CSS .basura height


  readonly binAreas = [
    { type: 'verde', x: 120, y: 280, width: 125, height: 125 }, // Revisa estas dimensiones si son diferentes
    { type: 'negra', x: 605, y: 287, width: 125, height: 125 }, // Revisa estas dimensiones si son diferentes
    { type: 'blanca', x: 1045, y: 297, width: 125, height: 125 }, // Revisa estas dimensiones si son diferentes
  ];


  @ViewChild('gameContainer') gameContainer!: ElementRef<HTMLDivElement>;

  // Variable para la suscripción de resize (si se descomenta)
  // private resizeSubscription!: Subscription;

  // Inyecta NgZone en el constructor
  constructor(private zone: NgZone) { }




  ngOnInit(): void {
    this.generarBasuras();
  }

  generarBasuras(): void {
    const colores: ('verde' | 'negra' | 'blanca')[] = ['verde', 'negra', 'blanca'];
    // CAMBIAR a 15 basuras en total (5 de cada color)
    const cantidadPorColor = 5;

    const maxX = this.gameAreaWidth - this.basuraWidth;
    const maxY = this.gameAreaHeight - this.basuraHeight;

    this.basuras = [];

    // Generar 5 basuras de cada color
    colores.forEach(color => {
      // Para cada color, genera la cantidad especificada de basuras
      for (let i = 0; i < cantidadPorColor; i++) {
        // --- Lógica para seleccionar una imagen aleatoria para este color ---
        // 1. Obtén el array de imágenes disponibles para el color actual desde basuraImageMap
        const imagesForColor = this.basuraImageMap[color];
        // 2. Selecciona un índice aleatorio dentro del rango de ese array
        const randomIndex = Math.floor(Math.random() * imagesForColor.length);
        // 3. Obtén la ruta de la imagen usando el índice aleatorio
        const randomImageSrc = imagesForColor[randomIndex];
        // -------------------------------------------------------------------
  
        // Crea el nuevo objeto basura y añádelo al array this.basuras
        this.basuras.push({
          x: Math.floor(Math.random() * maxX), // Posición X aleatoria dentro de los límites
          y: Math.floor(Math.random() * maxY), // Posición Y aleatoria dentro de los límites
          recogida: false, // Inicialmente no está recogida
          color: color, // Asigna el color actual del bucle
          isCarried: false, // Inicialmente no está siendo llevada por el personaje
          imageSrc: randomImageSrc // Asigna la ruta de la imagen seleccionada aleatoriamente
        });
      }
    });


    console.log('Basuras generadas:', this.basuras);
  }


  readonly basuraImageMap: { [key in Basura['color']]: string[] } = {
    'verde': [
      'assets/educativo/cascara-banana3.png', // ¡Sin el ../ !
      'assets/educativo/manzana1.png',       // ¡Sin el ../ !
      'assets/educativo/hueso-final2.png'    // ¡Sin el ../ !
    ],
    'negra': [
      'assets/educativo/servilleta-final.png', // ¡Sin el ../ !
      'assets/educativo/higienico-final.png',    // ¡Sin el ../ !
    ],
    'blanca': [
      'assets/educativo/lata-bebida-final.png', // ¡Sin el ../ !
      'assets/educativo/carton-final.png',  // ¡Sin el ../ !
      'assets/educativo/papel-final.png'     // ¡Sin el ../ !
    ],
  };


  // --- moverPersonaje AHORA incluye la actualización de posición ---
  moverPersonaje(event: KeyboardEvent): void {
    const velocidad = 10;
    let newX = this.personajeX;
    let newY = this.personajeY;

    switch (event.key) {
      case 'ArrowUp': newY -= velocidad; break;
      case 'ArrowDown': newY += velocidad; break;
      case 'ArrowLeft': newX -= velocidad; break;
      case 'ArrowRight': newX += velocidad; break;
      default: return;
    }

    // Actualiza la posición con límites
    this.personajeX = Math.max(0, Math.min(newX, this.gameAreaWidth - this.personajeWidth));
    this.personajeY = Math.max(0, Math.min(newY, this.gameAreaHeight - this.personajeHeight));

    if (this.carriedBasura) {
      // Ajusta estos offsets si quieres que la basura aparezca en otro lugar respecto al personaje
      const offsetX = 10;
      const offsetY = 10;
      this.carriedBasura.x = this.personajeX + offsetX;
      this.carriedBasura.y = this.personajeY + offsetY;
    }

    this.detectarColisiones();
  }

  detectarColisiones(): void {
    // Solo detectar colisiones con basuras si el personaje NO ESTÁ LLEVANDO NADA
    if (this.carriedBasura === null) {
      for (const basura of this.basuras) {
        // Colisionar solo con basuras que NO han sido recogidas (correctamente clasificadas)
        // y que NO están siendo llevadas actualmente por alguien (aunque solo hay 1 personaje)
        if (!basura.recogida && !basura.isCarried) {
          const colisionX = this.personajeX < basura.x + this.basuraWidth &&
            this.personajeX + this.personajeWidth > basura.x;
          const colisionY = this.personajeY < basura.y + this.basuraHeight &&
            this.personajeY + this.personajeHeight > basura.y;

          if (colisionX && colisionY) {
            // ¡Colisión detectada con una basura disponible! Recogerla.
            basura.isCarried = true; // Marcarla como llevada
            this.carriedBasura = basura; // Asignarla al personaje
            // basura.recogida = true; // <--- QUITAR ESTO. La basura NO desaparece al recogerla
            console.log(`Recogiste una basura ${basura.color}`);
            // Salir del bucle, el personaje solo puede llevar una basura a la vez
            break;
          }
        }
      }
    }
    // Si ya lleva una basura, no hacemos nada en esta función de detección de colisiones con basuras
  }

  soltarBasura(): void {
    if (this.carriedBasura) {
      console.log('Intentando soltar basura...');
      console.log('Basura llevada:', this.carriedBasura); // ¿Es realmente la banana?
      let droppedCorrectly = false;



      for (const bin of this.binAreas) {
        console.log('Verificando colisión con caneca:', bin.type, 'en coords:', bin.x, bin.y, bin.width, bin.height);
        console.log('Posición Personaje (centro aproximado de la basura):', this.personajeX, this.personajeY); // Usa las coords del personaje para la colisión

        const colisionX = this.personajeX < bin.x + bin.width && this.personajeX + this.personajeWidth > bin.x;
        const colisionY = this.personajeY < bin.y + bin.height && this.personajeY + this.personajeHeight > bin.y;

        console.log(`Colisión calculada con ${bin.type}: X=${colisionX}, Y=${colisionY}`); // ¿Ambos son TRUE cuando sueltas sobre la caneca?

        if (colisionX && colisionY) {
          console.log(`¡Colisión detectada con caneca ${bin.type}!`);
          console.log(`Comparando color basura "${this.carriedBasura.color}" con tipo caneca "${bin.type}"`); // ¿Son idénticos?
          if (this.carriedBasura.color === bin.type) {
            console.log('¡¡¡CLASIFICACIÓN CORRECTA!!! Estableciendo recogida = true');
            this.carriedBasura.recogida = true; // Esta es la línea clave
            droppedCorrectly = true;
            break;
          } else {
            console.log('Clasificación Incorrecta.');
          }
        }
      }
      this.carriedBasura.isCarried = false;
      this.carriedBasura = null;
    }
  }


  @HostListener('window:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
      event.preventDefault(); // Evitar que las flechas hagan scroll
      this.moverPersonaje(event); // Mover al personaje y la basura si la lleva
    } else if (event.key === ' ') { // <--- AÑADIDO: Tecla Espacio para soltar
      event.preventDefault(); // Evitar scroll si la barra espaciadora lo causa
      this.soltarBasura(); // Llamar al método soltarBasura
    }
  }
}