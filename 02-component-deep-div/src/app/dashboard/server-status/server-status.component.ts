import { Component, DestroyRef, effect, Input, OnDestroy, OnInit, signal } from '@angular/core';
import type { ServerStatus } from './server-status.model';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  // used in Angulat >= 16 you can use OnDestroy for Angular <= 15
  constructor(private destroyRef: DestroyRef) {
    effect(() => {
      console.log('Server status changed:', this.currentStatus());
    })
  }
  currentStatus = signal<ServerStatus>('online');

  // private intervalId?: ReturnType<typeof setInterval>;

  ngOnInit() {
    const intervalId = setInterval(() => {
      this.updateStatus();
    }, 5000);

    this.destroyRef.onDestroy(() => {
      clearInterval(intervalId);
    });
  }

  updateStatus() {
    const statuses = ['online', 'offline', 'unknown'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    this.currentStatus.set(statuses[randomIndex] as ServerStatus);
  }

  // ngOnDestroy(): void {
  //   clearInterval(this.intervalId);
  // }
}
