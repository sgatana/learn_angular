import { Component, Input, output, Output, signal } from '@angular/core';
import { Ticket } from '../ticket.mode';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  @Input({ required: true }) ticket!: Ticket;

  detailsVisible = signal(false);

  onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible());
    this.detailsVisible.update((prev) => !prev);
  }

  close = output<string>();

  onMarkAsClosed(id: string) {
    this.close.emit(id);
  }
}
