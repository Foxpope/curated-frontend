import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ClientMessage } from 'src/app/models/client-messages';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  title="All Users"
  public users: User[] = [];

  // use structural directive to check IF we have users, and if not, then we show the client message
  public clientMessage: ClientMessage = new ClientMessage('Sorry no users to display');

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.findAllUsers();
  }

  public findAllUsers() {
    this.userService.findAllUsers().subscribe(data => this.users = data)
  }
}
