import { User } from 'src/app/models/user';
import { Movie } from './movie';
export class Review {
  id: number;
  rating: number;
  recommended: boolean;
  review: string;
  movie: Movie;
  user: User;

  constructor(id: number, rating: number, recommended: boolean, review: string, movie: Movie, user: User) {
    this.id = id;
    this.rating = rating;
    this.recommended = recommended;
    this.review = review;
    this.movie = movie;
    this.user = user;
  }
}
