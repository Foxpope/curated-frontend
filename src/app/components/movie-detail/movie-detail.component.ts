import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientMessage } from 'src/app/models/client-messages';
import { MovieService } from 'src/app/services/movie.service';
import { ReviewService } from 'src/app/services/review.service';
import { Movie } from 'src/app/models/movie';
import { Review } from 'src/app/models/review';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  title="Movie Details"
  movie = new Movie('', '', 0, '', '', '', '', '', '', '', '', '', []);
  userReviewObject = new Review(0, 0, false, '', this.movie, new User(0, '', '', '', '', '', [], [], []));
  current_username = sessionStorage.getItem("username");


  public clientMessage: ClientMessage = new ClientMessage('Sorry no movie to display');

  constructor(private movieService: MovieService,
    private reviewService: ReviewService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.getMovie(routeParams.id);
    });
    console.log(this.movie);
  }

  setUserReview(): void {
    console.log(this.movie.reviews);
    for (const review of this.movie.reviews) {
      if (review.user.username === this.current_username) {
        this.userReviewObject = review;
        this.userReviewObject.movie = this.movie;
      }
    }
  }

  getMovie(id: string): void {
    this.movieService.findByMovieId(id)
      .subscribe(data => {
        this.movie.id = data.id;
        this.movie.title = data.title;
        this.movie.year = data.year;
        this.movie.rated = data.rated;
        this.movie.released = data.released;
        this.movie.director = data.director;
        this.movie.plot = data.plot;
        this.movie.poster = data.poster;
        this.movie.genre = data.genre;
        this.movie.metacritic = data.metacritic;
        this.movie.runtime = data.runtime;
        this.movie.actors = data.actors;
        this.movie.reviews = data.reviews;
        this.setUserReview();
      });
  }

  insertReview() {
    // Adding or updating?
    if (this.userReviewObject.id === 0) {
      console.log("adding review");
      this.reviewService.addReview(this.userReviewObject)
      .subscribe(data => {
        this.userReviewObject.id = data.id;
        this.userReviewObject.rating = data.rating;
        this.userReviewObject.recommended = data.recommended;
        this.userReviewObject.review = data.review;
        this.userReviewObject.movie = data.movie;
        this.userReviewObject.user = data.user;
      })
    } else {
      console.log("updating review");
      this.reviewService.updateReview(this.userReviewObject)
      .subscribe(data => {
        this.userReviewObject.id = data.id;
        this.userReviewObject.rating = data.rating;
        this.userReviewObject.recommended = data.recommended;
        this.userReviewObject.review = data.review;
        this.userReviewObject.movie = data.movie;
        this.userReviewObject.user = data.user;
      });
    }

  }

}
