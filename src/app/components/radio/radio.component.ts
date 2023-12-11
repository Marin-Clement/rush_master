// radio.component.ts

import {
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import {
  io
} from 'socket.io-client';
import {
  AfterViewInit
} from '@angular/core';
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
})

export class RadioComponent implements AfterViewInit {
  private socket: any;
  private audioContext!: AudioContext;
  private audioBuffer!: AudioBuffer;
  private audioSource!: AudioBufferSourceNode;
  private gainNode!: GainNode;

  isRadioUp: boolean = false;
  isCollapsed: boolean = true;

  currentImage: string = '';
  currentSong: string = '';
  elapsedTime: number = 0;
  songDuration: number = 0;
  progress: number = 0;
  volume: number = 0.5;
  timeSyncThreshold: number = 5;
  isPlaying: boolean = false;
  musicChange: boolean = false;

  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  constructor() {}

  private createAudioNodes() {
    if (this.audioSource) {
      this.audioSource.disconnect();
    }

    this.audioSource = this.audioContext.createBufferSource();
    this.audioSource.buffer = this.audioBuffer;

    this.gainNode = this.audioContext.createGain();
    this.gainNode.gain.value = this.volume;
    this.audioSource.connect(this.gainNode);
    this.gainNode.connect(this.audioContext.destination);
  }

  private playAudio(position: number) {
    this.createAudioNodes();

    // Check if the audio context is in the suspended state and resume it
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume().then(() => {
        this.playAudioFromPosition(position);
      });
    } else {
      this.playAudioFromPosition(position);
    }
    this.isPlaying = true;
  }

  private playAudioFromPosition(position: number) {
    this.audioSource.start(0, position);
  }
  ngAfterViewInit() {
    this.socket = io('http://localhost:3002');

    this.socket.on('play', (data: any) => {
      this.isRadioUp = !!data.song;
      this.audioContext = new AudioContext();
      this.audioContext.suspend();
      this.musicChange = true;
      this.currentSong = data.song;
      this.songDuration = data.duration;
      this.currentImage = data.image;
      this.loadAudio(`http://localhost:3002/stream/${this.currentSong}`);
    });

    this.socket.on('time', (data: any) => {
      const serverTime = data.position;
      const clientTime = this.elapsedTime;

      const timeDifference = Math.abs(serverTime - clientTime);
      this.progress = (this.elapsedTime / this.songDuration) * 100;
      this.elapsedTime = serverTime;

      // Check if the time difference is within the threshold or music change
      if (timeDifference > this.timeSyncThreshold) {
        this.songDuration = data.duration;
        if (this.audioContext.state === 'running' && this.isPlaying) {
          this.playAudio(this.elapsedTime);
        }
      }
      if (this.musicChange && this.isPlaying) {
        this.musicChange = false;
        this.playAudio(this.elapsedTime);
      }
    });
  }

  loadAudio(url: string) {
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(data => this.audioContext.decodeAudioData(data))
      .then(buffer => {
        this.audioBuffer = buffer;
        this.createAudioNodes();
      })
      .catch(error => console.error('Error loading audio:', error));
  }

  playPause() {

    if ((this.audioContext.state) === 'suspended') {
      this.playAudio(this.elapsedTime);
      this.audioContext.resume();
      this.isPlaying = true;
    } else if (this.audioContext.state === 'running') {
      this.audioContext.suspend();
      this.isPlaying = false;
    } else {
      this.playAudio(this.elapsedTime);
      this.isPlaying = true;
    }
  }

  updateVolume(): void {
    if (this.audioContext && this.gainNode) {
      this.gainNode.gain.value = this.volume;
    }
  }


  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  formatTitle(title: string): string {
    return title.replace(/_/g, ' ').replace('.mp3', '');
  }

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.code === 'Space') {
      this.playPause();
      event.preventDefault();
    }
  }

  previousPlaylist() {
    fetch('http://localhost:3002/previous')
  }

  nextPlaylist() {
    fetch('http://localhost:3002/skip')
  }
}
