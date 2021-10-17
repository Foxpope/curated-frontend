import { ClientMessage } from 'src/app/models/client-messages';
import { AuthenticationService } from './../../services/authentication-service.service';
import { LoginForm } from './../../models/login-form';
import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NavComponent } from '../nav/nav.component';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  alertStatus: Boolean = false;
  public clientMessage = new ClientMessage('');
  public currentUser = new User(0, '', '', '', '', '', [], [], []);

  constructor(private authenticationService: AuthenticationService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.getUser();
  }

  public update(userEditForm: NgForm) {
    if (userEditForm.valid) {
      this.userService.updateUser(this.currentUser)
        .subscribe(
          user => {}
        )
    }
  }


  public getUser(): void {
    const temp = sessionStorage.getItem('username');
    let username = temp ? JSON.stringify(temp) : "";
    username = username.substring(1, username.length - 1);
    this.userService.findByUsername(username)
      .subscribe(
        user => {
          this.currentUser.id = user.id;
          this.currentUser.email = user.email;
          this.currentUser.firstName = user.firstName;
          this.currentUser.lastName = user.lastName;
          this.currentUser.password = user.password;
          this.currentUser.username = user.username;
          this.currentUser.following = user.following;
          this.currentUser.followers = user.followers
          this.currentUser.reviews = user.reviews;
        }
      )
  }
}
