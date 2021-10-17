import { ClientMessage } from 'src/app/models/client-messages';
import { AuthenticationService } from './../../services/authentication-service.service';
import { LoginForm } from './../../models/login-form';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  alertStatus: Boolean = false;
  public clientMessage = new ClientMessage('');
  
  constructor(private authenticationService: AuthenticationService, private router: Router, private userService: UserService) { }

  public login(userForm: NgForm) {
    if (userForm.valid) {
      this.authenticationService.authenticate(userForm.value.user, userForm.value.password)
        .subscribe(
          data => {
            this.userService.findByUsername(userForm.value.user)
              .subscribe(
                user => {
                  sessionStorage.setItem('userId', JSON.stringify(user.id));
                  sessionStorage.setItem('firstName', user.firstName);
                  this.router.navigateByUrl('/main');
                },
                error => this.clientMessage.message = `We got an error : ${error}`
              )
          },
          error => {
            this.clientMessage.message = `We got an error : ${error}`; this.alertStatus = true;
          }

        )
    }
  }
  public alertReset() {
    this.alertStatus = false;
  }
}

