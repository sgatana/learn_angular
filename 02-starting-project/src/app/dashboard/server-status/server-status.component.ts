import { Component, Input, OnInit } from '@angular/core';
import type { ServerStatus } from './server-status.model';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit {
  constructor() {}
  currentStatus: ServerStatus = 'online';

  ngOnInit() {
    setInterval(() => {
      this.updateStatus();
    }, 5000);
  }

  updateStatus() {
    const statuses = ['online', 'offline', 'unknown'];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    this.currentStatus = statuses[randomIndex] as ServerStatus;
    console.log(`Server status updated to: ${this.currentStatus}`);
  }
}
