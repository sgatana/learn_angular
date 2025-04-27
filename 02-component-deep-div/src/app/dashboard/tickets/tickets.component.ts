import { Component, signal } from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { Ticket } from './ticket.mode';
import { TicketComponent } from "./ticket/ticket.component";

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  tickets = signal<Ticket[]>([]);

  onAddTicket({ title, request }: { title: string; request: string }) {
    const ticket: Ticket = {
      title,
      request,
      id: Math.random().toString(36).substring(2, 15),
      status: 'open',
    };
    this.tickets.set(this.tickets().concat(ticket));
  }

  onMarkAsClosed(id: string) {
    this.tickets.set(this.tickets().map((ticket) => {
      if(ticket.id === id) {
        ticket.status = 'closed';
      }
      return ticket;
    }))
  }
}
