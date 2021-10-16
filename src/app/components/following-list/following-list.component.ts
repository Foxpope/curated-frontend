import { Component, Input, OnInit  } from '@angular/core';
import { Review } from 'src/app/models/review';
import { FollowService } from 'src/app/services/follow.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Follow } from 'src/app/models/follow';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.css']
})
export class FollowingListComponent implements OnInit {


  @Input() followingList : Follow[] = [];
  currentUserId = Number(JSON.parse(sessionStorage.getItem('userId')!));
  public currentUser = new User(0, '', '', '', '', '', [], [], [])
  username = sessionStorage.getItem("username");

  //follow ID will be used when unfollow is clicked
  followObject: Follow = new Follow(0, this.currentUser, new User(0, '', '', '', '', '', [], [], []), new Date());
  

  constructor(private followService: FollowService, private userService: UserService) { 
  }

  ngOnInit(): void {
    this.getUser();
  }

  public getUser(): void {
    const temp = sessionStorage.getItem('username');
    let username = temp ? JSON.stringify(temp) : "";
    username = username.substring(1, username.length - 1);
    this.userService.findByUsername(username)
      .subscribe(
        user => {
          this.currentUser.id = user.id;
          this.currentUser.email = user.email;
          this.currentUser.firstName = user.firstName;
          this.currentUser.lastName = user.lastName;
          this.currentUser.password = user.password;
          this.currentUser.username = user.username;
          this.currentUser.following = user.following;
          this.currentUser.followers = user.followers
          this.currentUser.reviews = user.reviews;
        }
      )
  }

  ngOnChanges() {
    
    console.log(this.followingList);
  }

  isFollowing(userId: number): boolean {
    for (const followObject of this.currentUser.following) {
      if (followObject.following.id === userId) {
        this.followObject = followObject;
        return true;
      }
    }
    return false;
  }


  public followUser(userToFollowId: number): void {
    console.log(userToFollowId);
    if (this.isFollowing(userToFollowId)) {
      this.followService.removeFollow(this.followObject.followId)
      .subscribe(data => {
        // Call Service to remove the the appropriate follow from the session storage
        this.currentUser.following = this.followService.removeFromStorage(
          this.currentUser.following, this.followObject.followId);
      });
    } else {
      console.log("follow")
      this.followService.addFollow(
        this.currentUser, 
        new User(userToFollowId, '', '', '', '', '', [], [], []))
        .subscribe(data => this.currentUser.following.push(data))
    }
  }

}
