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

  currentUserId = Number(JSON.parse(sessionStorage.getItem('userId')!));

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
      console.log(data)
      this.user = data
      console.log(this.user.id + " *** " + this.currentUserId)
    })

  }

  public populateReviews(): void {

    let dummyHeader = document.getElementById('curator-bar')!

    dummyHeader.innerHTML = this.username + '\'s Reviews'

    let x = document.getElementById('reviewList')!
    x.style.display = "block";

    let y = document.getElementById('followingList')!
    y.style.display = "none";

    let z = document.getElementById('followerList')!
    z.style.display = "none";
  }

  public populateFollowing(): void {

    let dummyHeader = document.getElementById('following-bar')!

    dummyHeader.innerHTML = 'Who is ' + this.user.username + ' Following?'

    let x = document.getElementById('reviewList')!
    x.style.display = "none";

    let y = document.getElementById('followingList')!
    y.style.display = "block";

    let z = document.getElementById('followerList')!
    z.style.display = "none";
  }

  public populateFollowers(): void {

    let dummyHeader = document.getElementById('follower-bar')!

    dummyHeader.innerHTML = this.user.username + '\'s Followers'

    let x = document.getElementById('reviewList')!
    x.style.display = "none";

    let y = document.getElementById('followingList')!
    y.style.display = "none";

    let z = document.getElementById('followerList')!
    z.style.display = "block";
  }

}
