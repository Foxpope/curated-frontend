import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { ClientMessage } from 'src/app/models/client-messages';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  title="Movie Details"
  // movie: Movie;
  // public movieId: number; 
  movie = new Movie(0, '', 0, '', '', '', '', '', '', '', '', '');

  public clientMessage: ClientMessage = new ClientMessage('Sorry no movie to display');

  constructor(private movieService: MovieService, 
    private route: ActivatedRoute,
    private location: Location) { 
    // this.movieId = id;
  }

  ngOnInit(): void {
    // this.route.paramMap
    //   .switchMap((params: ParamMap) => this.movieService.findByMovieId(+params.get('id')))
    //   .subscribe(data => this.movie = movie);
  }

  public findMovieById(id: number) {
    this.movieService.findByMovieId(id).subscribe(data => this.movie = data);
  }

}
