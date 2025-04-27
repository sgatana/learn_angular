import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormControlComponent } from '../../../shared/form-control/form-control.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, FormControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  @ViewChild('ticketForm') form?: ElementRef<HTMLFormElement>
  @Output () add  = new EventEmitter<{title: string, request: string}>()
  onSubmit(title: string, request: string) {
    this.add.emit({title, request})
    this.form?.nativeElement.reset()
  }
}
