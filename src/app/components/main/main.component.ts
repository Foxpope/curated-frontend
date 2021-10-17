import { User } from 'src/app/models/user';
import { ClientMessage } from './../../models/client-messages';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // public u = new User(0, '', '', '', '', '', [], [], [])
  // public clientMessage = new ClientMessage('')

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // this.getUser();
  }

//   public getUser(): void {
//     const temp = sessionStorage.getItem('username');
//     let username = temp ? JSON.stringify(temp) : "";
//     username = username.substring(1, username.length - 1);
//   }
}
