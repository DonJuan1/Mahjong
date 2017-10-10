import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent {

  private checkedUsers: User[] = [];

  @Input() players: User[];
  @Input() canCheck: boolean;

  //Event when a user is selected
  @Output() checked: EventEmitter<User[]> = new EventEmitter();

  //Method when a user is selected
  userChecked(user: User) {
    //Is it possible the check the player
    if (this.canCheck) {
      const index = this.checkedUsers.findIndex(u => u._id === user._id);
      //Is the user already selected
      if (index > -1) {
        this.checkedUsers.splice(index, 1);
      } else {
        this.checkedUsers.push(user);
      }

      //Emit the checked event
      this.checked.emit(this.checkedUsers);
    }
  }
}
