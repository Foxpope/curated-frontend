import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, NavigationError } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent{

  selected = 'movies'
  static firstName: String;
  currentRoute: String;

  constructor(private router: Router) {
    this.currentRoute = "";
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        // Show progress spinner or progress bar
        console.log('Route change detected');
      }

      if (event instanceof NavigationEnd) {
        // Hide progress spinner or progress bar
        this.currentRoute = event.url;
      }

      if (event instanceof NavigationError) {
        // Hide progress spinner or progress bar

        // Present error to user
        console.log(event.error);
      }
    });
  }
  get staticFirstName()
  {
    return NavComponent.firstName;
  }
}
