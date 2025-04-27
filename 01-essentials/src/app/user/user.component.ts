import {
  Component,
  computed,
  EventEmitter,
  input,
  Input,
  Output,
  output,
} from '@angular/core';
import { User } from './user.model';
import { CardComponent } from "../shared/card/card.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  //  @Input({required: true}) avatar!: string;
  //  @Input({required: true}) name!: string;

  //  use signal
  // avatar = input.required<User['avatar']>();
  // id = input.required<User['id']>();
  // name = input.required<string>();
  @Input({required: true}) user!: User;
  // user = input.required<User>();
  // @Output() select = new EventEmitter<string>();
  select = output<User['name']>();

  @Input({required: true}) isActiveUser!: boolean; 

  //  get imagePath () {
  //   return `assets/users/${this.avatar()}`;
  //  }
  imagePath = computed(() => `assets/users/${this.user.avatar}`);

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
