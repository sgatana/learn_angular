import { Component, Input } from '@angular/core';
import { DUMMY_USERS, User } from './user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = DUMMY_USERS;

  selectedUserId?: User['id'];

  get selectedUser() {
    return this.users.find((user) => user.id === this.selectedUserId)!;
  }

  onSelectUser(id: User['id']) {
    this.selectedUserId = id;
  }
}
