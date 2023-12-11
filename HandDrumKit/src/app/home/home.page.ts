import { Component, ElementRef } from '@angular/core';
import { PredictionEvent } from '../prediction-event'; // Import PredictionEvent

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }

  drumKeys = [
    { code: '65', label: 'A', sound: 'clap', audioSrc: '../../assets/sounds/clap.wav' },
    { code: '83', label: 'S', sound: 'hihat', audioSrc: '../../assets/sounds/hihat.wav' },
    { code: '68', label: 'D', sound: 'kick', audioSrc: '../../assets/sounds/kick.wav' },
    { code: '70', label: 'F', sound: 'openhat', audioSrc: '../../assets/sounds/openhat.wav' },
    { code: '71', label: 'G', sound: 'boom', audioSrc: '../../assets/sounds/boom.wav' },
    { code: '72', label: 'H', sound: 'ride', audioSrc: '../../assets/sounds/ride.wav' },
    { code: '74', label: 'J', sound: 'snare', audioSrc: '../../assets/sounds/snare.wav' },
    { code: '75', label: 'K', sound: 'tom', audioSrc: '../../assets/sounds/tom.wav' },
    { code: '76', label: 'L', sound: 'tink', audioSrc: '../../assets/sounds/tink.wav' },
  ];

  constructor(private el: ElementRef) {}

  handleGesture(event: PredictionEvent) {
    const gesture = event.getPrediction();
    const keyCode = this.mapGestureToKeyCode(gesture);
    if (keyCode) {
      this.playSoundByKeyCode(keyCode);
    }
  }

  mapGestureToKeyCode(gesture: string): string | null {
    const gestureMap: { [key: string]: string } = {
      'One Hand Open One Hand Closed': '65', // Clap
      'Two Open Hands': '83', // Hihat
      'Closed Hand': '68', // Kick
      'Two Closed Hands': '70', // Openhat
      'Open Hand': '71', // Boom
      'One Hand Pointing One Hand Closed': '72', // Ride
      'Hand Pointing': '74', // Snare
      'Hand Pinching': '75', // Tom
      'Two Hands Pinching': '76' // Tink
    };

    return gestureMap[gesture] || null;
  }

  playSoundByKeyCode(keyCode: string) {
    const audio = this.el.nativeElement.querySelector(`audio[data-key="${keyCode}"]`);
    const key = this.el.nativeElement.querySelector(`div[data-key="${keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }


  removeTransition(event: any) {
  if (event.propertyName !== 'transform') return;
  event.target.classList.remove('playing');
}

}
