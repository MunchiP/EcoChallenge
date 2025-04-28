import { Component, OnDestroy, OnInit } from '@angular/core';
// importo el servicio de Audio Manager
import { AudioManager } from '../servicios/audiomanager';
import { Subscription } from 'rxjs';
// Importando Material y Common aquí usando pra ngFor
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
// Ruteo
import { RouterLink } from "@angular/router";


interface AudioItem {
  id: string;
  url: string;
  isPlaying: boolean;
}

@Component({
  selector: 'app-educativo',
  imports: [CommonModule, MatIconModule],
  templateUrl: './educativo.component.html',
  styleUrl: './educativo.component.css'
})


export class EducativoComponent implements OnInit, OnDestroy {

  audios: AudioItem[] = [
    {id: 'audio1', url: 'assets/Text1.mp3', isPlaying: false},
    {id: 'audio2', url: 'assets/Text2.mp3', isPlaying: false},
    {id: 'audio3', url: 'assets/Text3.mp3', isPlaying: false}
  ];

  currentPlayingId: string | null = null;
  private audioStateSubscription!: Subscription;
  // private currentAudioSourceSubscription!: Subscription;

  constructor(private audioManager: AudioManager){}

  ngOnInit(): void {
    this.audioStateSubscription = this.audioManager.audioState$.subscribe(state =>{
      this.audios = this.audios.map(audio => ({
        ...audio,
        isPlaying: state.audioElement?.src === audio.url && state.isPlaying
      }));
        this.currentPlayingId =state.isPlaying ? this.audios.find(a => a.url === state.audioElement?.src)?.id || null: null;
    });
  }


  ngOnDestroy(): void{
    if (this.audioStateSubscription) {
      this.audioStateSubscription.unsubscribe();
    }
  }

  // tooglePlayPause(audioItem: AudioItem){
  //   if (this.currentPlayingId === audioItem.id && audioItem.isPlaying) {
  //     this.audioManager.pauseAudio();
  //   } else {
  //     this.audioManager.playAudio(audioItem.url);
  //   }
  // }

  // togglePlayPause(audioItem: AudioItem) {
  //   if (this.currentPlayingId === audioItem.id && audioItem.isPlaying) {
  //     this.audioManager.pauseAudio();
  //     // Actualiza el estado isPlaying en el array
  //     this.audios = this.audios.map(audio =>
  //       audio.id === audioItem.id ? { ...audio, isPlaying: false } : audio
  //     );
  //     this.currentPlayingId = null;
  //   } else {
  //     this.audioManager.playAudio(audioItem.url);
  //     // Actualiza el estado isPlaying en el array
  //     this.audios = this.audios.map(audio =>
  //       audio.id === audioItem.id ? { ...audio, isPlaying: true } : { ...audio, isPlaying: false }
  //     );
  //     this.currentPlayingId = audioItem.id;
  //   }
  // }

  togglePlayPause(audioId: string)
  {
    const audioItem = this.audios.find(audio => audio.id === audioId);
    if (audioItem) {
      if (this.currentPlayingId === audioItem.id && audioItem.isPlaying) {
        this.audioManager.pauseAudio();
        this.audios = this.audios.map(audio =>
          audio.id === audioItem.id ? { ...audio, isPlaying: false} : audio
        );
        this.currentPlayingId = null;
      } else {
        this.audioManager.playAudio(audioItem.url);
        this.audios = this.audios.map(audio =>
          audio.id === audioItem.id ? { ...audio, isPlaying: true} : {...audio, isPlaying: false}
        );
        this.currentPlayingId = audioItem.id;
      }
    }
  }

  getAudioState(audioId: string): boolean {
    const audio = this.audios.find(a => a.id === audioId);
    return audio ? audio.isPlaying : false;
  }
}

  


  //Antiguo código de reproducción de audio
  // reproduceAudio(ruta: string){
  //   const audio = new Audio();
  //   audio.src = ruta;
  //   audio.load();
  //   audio.play();
  // }

