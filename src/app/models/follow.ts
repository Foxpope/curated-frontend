import { User } from 'src/app/models/user';
export class Follow {
  followId: number;
  follower: User;
  following: User;
  followDate: Date

  constructor(followId: number, follower: User, following: User, followDate: Date) {
    this.followId = followId;
    this.follower = follower;
    this.following = following;
    this.followDate = followDate;
  }
}
