export class UserReview {
  userId: number;
  movieId: number;
  rating: number;
  recommended: boolean;
  review: string;

  constructor(userId: number, movieId: number, rating: number, recommended: boolean, review: string) {
    this.userId = userId;
    this.movieId = movieId;
    this.rating = rating;
    this.recommended = recommended;
    this.review = review;
  }
}
