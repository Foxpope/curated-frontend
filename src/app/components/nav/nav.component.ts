import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  selected = 'movies'
  firstName = sessionStorage.getItem('firstName')

  constructor() { }

  ngOnInit(): void {
  }

}
