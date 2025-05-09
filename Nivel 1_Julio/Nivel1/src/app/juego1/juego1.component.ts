import { Component, AfterViewInit } from '@angular/core';
import { DragDropModule, CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

interface DraggableItem {
  id: string;
  imageUrl: string;
}

@Component({
  selector: 'app-drag-boundary',
  standalone: true,
  imports: [DragDropModule, NgIf,CommonModule],
  templateUrl: './juego1.component.html',
  styleUrl: './juego1.component.css',
})
export class Juego1component implements AfterViewInit {
  dropTargetRect: DOMRect | null = null;
  dropTarget2Rect: DOMRect | null = null;
  draggableItemRects: { [key: string]: DOMRect | null } = {};
  isCorrect: { [key: string]: 'initial' | 'correct' | 'incorrect' } = {};
  dropped: { [key: string]: boolean } = {};
  isDraggableVisible: { [key: string]: boolean } = {};
  draggableItems: { [key: string]: DraggableItem } = {};

  constructor(private router: Router) {
    // url imagenes
    this.draggableItems['objeto-1'] = { id: 'objeto-1', imageUrl: '/assets/botellaP.png' };
    this.draggableItems['objeto-2'] = { id: 'objeto-2', imageUrl: '/assets/lata.png' };
    this.draggableItems['objeto-3'] = { id: 'objeto-3', imageUrl: '/assets/vidrioB.png' };
    this.draggableItems['objeto-4'] = { id: 'objeto-4', imageUrl: '/assets/carton.png' };
    this.draggableItems['objeto-5'] = { id: 'objeto-5', imageUrl: '/assets/vidrioR.png' };

    this.isDraggableVisible['objeto-1'] = true;
    this.isDraggableVisible['objeto-2'] = true;
    this.isDraggableVisible['objeto-3'] = true;
    this.isDraggableVisible['objeto-4'] = true;
    this.isDraggableVisible['objeto-5'] = true;

    this.isCorrect['objeto-1'] = 'initial';
    this.isCorrect['objeto-2'] = 'initial';
    this.isCorrect['objeto-3'] = 'initial';
    this.isCorrect['objeto-4'] = 'initial';
    this.isCorrect['objeto-5'] = 'initial';

    this.dropped['objeto-1'] = false;
    this.dropped['objeto-2'] = false;
    this.dropped['objeto-3'] = false;
    this.dropped['objeto-4'] = false;
    this.dropped['objeto-5'] = false;
  }
  

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      const dropTarget = document.getElementById('drop-target');
      const dropTarget2 = document.getElementById('No');
      const draggableItem1 = document.getElementById('objeto-1');
      const draggableItem2 = document.getElementById('objeto-2');
      const draggableItem3 = document.getElementById('objeto-3');
      const draggableItem4 = document.getElementById('objeto-4');
      const draggableItem5 = document.getElementById('objeto-5');

      if (dropTarget) {
        this.dropTargetRect = dropTarget.getBoundingClientRect();
      }
      if (dropTarget2) {
        this.dropTarget2Rect = dropTarget2.getBoundingClientRect();
      }
      if (draggableItem1) {
        this.draggableItemRects['objeto-1'] = draggableItem1.getBoundingClientRect();
      }
      if (draggableItem2) {
        this.draggableItemRects['objeto-2'] = draggableItem2.getBoundingClientRect();
      }
      if (draggableItem3) {
        this.draggableItemRects['objeto-3'] = draggableItem3.getBoundingClientRect();
      }
      if (draggableItem4) {
        this.draggableItemRects['objeto-4'] = draggableItem4.getBoundingClientRect();
      }
      if (draggableItem5) {
        this.draggableItemRects['objeto-5'] = draggableItem5.getBoundingClientRect();
      }
    }
  }

  correctTargets: { [key: string]: string } = {
    'objeto-1': 'target1', 
    'objeto-2': 'target1', 
    'objeto-3': 'target1',
    'objeto-4': 'target1',
    'objeto-5': 'target2',
  };

  onDragEnded(event: CdkDragEnd, itemId: string): void {
    this.dropped[itemId] = true;
    const draggedElementRect = event.source.getRootElement()?.getBoundingClientRect();

    if (draggedElementRect) {
      const isInTarget1 = this.dropTargetRect && this.checkIfInside(draggedElementRect, this.dropTargetRect);
      const isInTarget2 = this.dropTarget2Rect && this.checkIfInside(draggedElementRect, this.dropTarget2Rect);

      const correctTarget = this.correctTargets[itemId];

      let isCorrectlyPlaced = false;
      if (correctTarget === 'target1' && isInTarget1) {
        isCorrectlyPlaced = true;
      } else if (correctTarget === 'target2' && isInTarget2) {
        isCorrectlyPlaced = true;
      }

      if (isCorrectlyPlaced) {
        this.isCorrect[itemId] = 'correct';
        this.isDraggableVisible[itemId] = false;
      } else if (isInTarget1 || isInTarget2) {
        this.isCorrect[itemId] = 'incorrect';
      } else {
        this.isCorrect[itemId] = 'initial';
      }
    }
  }
  checkIfInside(draggedRect: DOMRect, targetRect: DOMRect): boolean {
    return !(
      draggedRect.right < targetRect.left ||
      draggedRect.left > targetRect.right ||
      draggedRect.bottom < targetRect.top ||
      draggedRect.top > targetRect.bottom
    );
  }

  GoJuego2() {
    this.router.navigate(['/educativo2']);
  }
}