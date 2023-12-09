import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
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

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    const keys = this.el.nativeElement.querySelectorAll('.key');
    keys.forEach((key: any) => {
      this.renderer.listen(key, 'transitionend', this.removeTransition);
    });
    this.renderer.listen('window', 'keydown', this.playSound.bind(this));
  }

  removeTransition(e: any) {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  }

  playSound(e: any) {
    const audio = this.el.nativeElement.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = this.el.nativeElement.querySelector(`div[data-key="${e.keyCode}"]`);
    if (!audio) return;

    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  }
}
