import { User } from 'src/app/models/user';
import { Movie } from './movie';
export class Review {
  reviewId: number;
  rating: number;
  recommended: boolean;
  review: string;
  movie: Movie;
  user: User;

  constructor(reviewId: number, rating: number, recommended: boolean, review: string, movie: Movie, user: User) {
    this.reviewId = reviewId;
    this.rating = rating;
    this.recommended = recommended;
    this.review = review;
    this.movie = movie;
    this.user = user;
  }
}
