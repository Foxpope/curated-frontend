import { Review } from './review';
import { Follow } from './follow';
export class User {
  id: number;
  username: string;
  email:string;
  password: string;
  firstName: string;
  lastName: string;
  reviews: Array<Review>;
  followers: Array<Follow>;
  following: Array<Follow>;


  constructor(id: number, username: string, email: string, password: string, firstName: string, lastName: string, reviews: Array<Review>, followers: Array<Follow>, following: Array<Follow>) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.reviews = reviews;
    this.followers = followers;
    this.following = following;
  }
}
