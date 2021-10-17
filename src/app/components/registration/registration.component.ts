import { UserService } from './../../services/user.service';
import { ClientMessage } from './../../models/client-messages';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{

  alertStatus:Boolean = false;
  public clientMessage = new ClientMessage('')

  constructor(private userService: UserService, private router: Router) { }

  public registerUser(registerForm:NgForm): void {
    let user = new User(0, registerForm.value.user, registerForm.value.email, registerForm.value.password, registerForm.value.firstName, registerForm.value.lastName, [], [], []);
    this.userService.registerUser(user)
      .subscribe(
        data => {
          this.clientMessage.message = `successfully added ${data.firstName}`;
          this.router.navigateByUrl('/login');
        },
        error => {
          this.clientMessage.message = `We got an error : ${error}`;
          this.alertStatus = true;
        }
      )
  }
  public alertReset()
  {
    this.alertStatus = false;
  }
}
