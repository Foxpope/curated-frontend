import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ClientMessage } from 'src/app/models/client-messages';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {

  fname_lname = 'Firstname Lastname'
  username = 'Username'

  public user = new User(0, '', '', '', '', '', [], [], [])

  public clientMessage: ClientMessage = new ClientMessage('Sorry no users to display');

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.updateNames()
  }

  public updateNames(): void {

    this.userService.findByUserId(1).subscribe(d => this.user = d)
    
  }

}
