import { UserService } from './../../services/user.service';
import { ClientMessage } from './../../models/client-messages';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{

  public user = new User(0, '', '', '', 'Ineedthistotest', 'pleasepleasework')
  public clientMessage = new ClientMessage('')

  constructor(private userService: UserService) { }

  public registerUser(): void {
    this.userService.registerUser(this.user)
      .subscribe(
        data => this.clientMessage.message = `succefully added ${data.firstName}`,
        error => this.clientMessage.message = `We got an error : ${error}`
      )
  }

}
