import { ClientMessage } from 'src/app/models/client-messages';
import { AuthenticationService } from './../../services/authentication-service.service';
import { LoginForm } from './../../models/login-form';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public clientMessage = new ClientMessage('')
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  public login(userForm: NgForm) {
    if (userForm.valid)
    {
      this.authenticationService.authenticate(userForm.value.user, userForm.value.password)
        .subscribe(
          data => {
            this.router.navigateByUrl('/main');
          },
          error => this.clientMessage.message = `We got an error : ${error}`
        )
    }
  }
}
