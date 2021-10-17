import { ClientMessage } from './../../models/client-messages';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{

  selected = 'movies'
  currentRoute: String;
  currentUsername = sessionStorage.getItem("username");
  public clientMessage = new ClientMessage('');

  constructor(private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = event.url;
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar

        // Present error to user
        this.clientMessage.message = `We got an error : ${event.error}`
      }
    });
  }
  get staticFirstName()
  {
    return sessionStorage.getItem('firstName');
  }
  logout() {
    sessionStorage.clear();
  }
}
