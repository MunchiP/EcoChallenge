// Se crea un Audio Manager para gestionar los diferentes audios del aplicativo

import { Injectable } from "@angular/core";
import { error } from "console";
import { BehaviorSubject } from "rxjs";

interface AudioData{
    audioElement: HTMLAudioElement | null;
    isPlaying: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class AudioManager {

    private currentAudio = new BehaviorSubject<string | null>(null);
    currentAudio$ = this.currentAudio.asObservable();

    private audioState = new BehaviorSubject<AudioData>({
        audioElement: null, isPlaying: false });

    audioState$ = this.audioState.asObservable();

    playAudio(audioSource: string){
        const currentAudio = this.audioState.value.audioElement;

        //Verificación si ya hay un audio reproduciendose para pausarlo
        if (currentAudio && this.audioState.value.isPlaying)
            {
                currentAudio.pause();
                this.audioState.next({audioElement: currentAudio, isPlaying: false});
            }   

        const newAudio = new Audio(audioSource);
        newAudio.play()
            .then(() =>{
                this.audioState.next({ audioElement: newAudio, isPlaying: true});
                this.currentAudio.next(audioSource);
                newAudio.addEventListener('ended', () =>{
                    this.stopAudio();
                });
            })
        .catch(error => {
            console.error('Error al reproducir el audio:', error);
            this.stopAudio();
        })
    }
        pauseAudio(){
            const currentAudio = this.audioState.value.audioElement;
            if(currentAudio && this.audioState.value.isPlaying)
            {
                currentAudio.pause();
                this.audioState.next({ audioElement: currentAudio, isPlaying: false});
            }
        }

        resumeAudio(){
            const currentAudio = this.audioState.value.audioElement;
            if (currentAudio && !this.audioState.value.isPlaying) 
            {
                currentAudio.play()
                .then(() => {
                    this.audioState.next({ audioElement: currentAudio, isPlaying: true});
                })    
                .catch(error => {
                    console.error('Error al reaudar el audio:', error);
                    this.stopAudio();
                })
            }
        }

        stopAudio(){
            const currentAudio = this.audioState.value.audioElement;
            if (currentAudio) {
                currentAudio.pause();
                //reanudarlo desde el inicio
                currentAudio.currentTime = 0; 
                this.audioState.next({audioElement: null, isPlaying:false});
                this.currentAudio.next(null);
            }
        }


}