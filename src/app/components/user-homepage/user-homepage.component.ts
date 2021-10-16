import { Review } from 'src/app/models/review';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ClientMessage } from 'src/app/models/client-messages';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.css']
})
export class UserHomepageComponent implements OnInit {

  public user = new User(0, '', '', '', '', '', [], [], [])
  public reviews:Review[] = []
  public username: string = ''

  public clientMessage: ClientMessage = new ClientMessage('Sorry no users to display');

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.updateNames()
    this.populateReviews()
  }

  public updateNames(): void {

    this.route.queryParams
      .subscribe(params => {
        this.username = params.username;
      }
    );

    this.userService.findByUsername(this.username).subscribe(data => {
      this.user = data
      console.log(this.user)
    })

  }

  public populateReviews(): void {

    let header = document.createElement('h4')

    header.id = 'list-header'

    let header_placeholder = document.createTextNode(this.username + '\'s Reviews')

    header.appendChild(header_placeholder)

    let dummyHeader = document.getElementById('list-header')!

    let parent = dummyHeader?.parentNode

    parent?.replaceChild(header, dummyHeader)
   
  }

  public populateFollowing(): void {
    let header = document.createElement('h4')

    header.id = 'list-header'

    let header_placeholder = document.createTextNode('Who is ' + this.user.username + ' Following?')

    header.appendChild(header_placeholder)

    let dummyHeader = document.getElementById('list-header')!

    let parent = dummyHeader?.parentNode

    parent?.replaceChild(header, dummyHeader)
  }

  public populateFollowers(): void {
    let header = document.createElement('h4')

    header.id = 'list-header'

    let header_placeholder = document.createTextNode(this.user.username + '\'s Followers')

    header.appendChild(header_placeholder)

    let dummyHeader = document.getElementById('list-header')!

    let parent = dummyHeader?.parentNode

    parent?.replaceChild(header, dummyHeader)
  }

}
