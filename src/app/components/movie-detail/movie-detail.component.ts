import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientMessage } from 'src/app/models/client-messages';
import { MovieService } from 'src/app/services/movie.service';
import { ReviewService } from 'src/app/services/review.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  title="Movie Details"
  movie = new Movie('', '', 0, '', '', '', '', '', '', '', '', '', []);
  current_username = sessionStorage.getItem("username");
  userReview: string = '';
  userRating: number = 0;
  isReviewed: boolean = false;

  public clientMessage: ClientMessage = new ClientMessage('Sorry no movie to display');

  constructor(private movieService: MovieService, 
    private reviewService: ReviewService,
    private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.getMovie();
    console.log(this.movie);
  }

  getUserReview(): [string, number, boolean] {
    console.log(this.movie.reviews);
    for (const review of this.movie.reviews) {
      if (review.user.username === this.current_username) {
        console.log(review);
        return [review.review, review.rating, true];
      }
    }
    return ['', 0, false];
  }

  getMovie(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
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
        [this.userReview, this.userRating, this.isReviewed] = this.getUserReview();
      });
  }

  insertReview() {
    
    console.log("Review: " + this.userReview);
    console.log("Rating: " + this.userRating);
    console.log("Has been reviewed before: " +  this.isReviewed);

  }
  
}
