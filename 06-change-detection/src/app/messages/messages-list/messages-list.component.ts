import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnDestroy, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesListComponent implements OnInit {
  private messagesService = inject(MessagesService);

  // @TODO: replace with async pipe
  // messages = this.messagesService.messages$;
  private cdRef = inject(ChangeDetectorRef);

  private destroyRef = inject(DestroyRef);

  messages: string[] = []

  ngOnInit(): void {
    const subscription = this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
      this.cdRef.markForCheck();
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe()
    })
  }

  // ngOnDestroy(): void {
  //   this.messagesService.messages$.unsubscribe();
  // }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
