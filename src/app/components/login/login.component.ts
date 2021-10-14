import { ClientMessage } from 'src/app/models/client-messages';
import { AuthenticationService } from './../../services/authentication-service.service';
import { LoginForm } from './../../models/login-form';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  public clientMessage = new ClientMessage('')
  public lf = new LoginForm("", "");
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  public login() {
    this.authenticationService.authenticate(this.lf.username, this.lf.password)
      .subscribe(
        data => {
          this.router.navigateByUrl('/main');
        },
        error => this.clientMessage.message = `We got an error : ${error}`,
      )
  }
}
