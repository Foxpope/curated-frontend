import { UserService } from './../../services/user.service';
import { ClientMessage } from './../../models/client-messages';
import { User } from './../../models/user';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{

  alertStatus:Boolean = false;
  public user = new User(0, '', '', '', '', '', [], [], [])
  public clientMessage = new ClientMessage('')

  constructor(private userService: UserService, private router: Router) { }

  public registerUser(): void {
    this.userService.registerUser(this.user)
      .subscribe(
        data => this.clientMessage.message = `succefully added ${data.firstName}`,
        error => {this.clientMessage.message = `We got an error : ${error}`; this.alertStatus = true;}
      )
      this.router.navigateByUrl('/login');
  }
  public alertReset()
  {
    this.alertStatus = false;
  }
}
