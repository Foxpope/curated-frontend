import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  moviesArray: any[] = [];
  movie = new Movie('', '', 0, '', '', '', '', '', '', '', '', '', []);
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService, private route: ActivatedRoute, private router: Router) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.getMovies(routeParams.search);
    });
  }

  public searchApi(movie: string) {
    this.movieService.searchMoviesByApiSpecific(movie)
      .subscribe(
        data => {
          this.movie.id = data.imdbID;
          this.movie.title = data.Title;
          this.movie.year = data.Year;
          this.movie.rated = data.Rated;
          this.movie.released = data.Released;
          this.movie.director = data.Director;
          this.movie.plot = data.Plot;
          this.movie.poster = data.Poster;
          this.movie.genre = data.Genre;
          this.movie.metacritic = data.Metascore;
          this.movie.runtime = data.Runtime;
          this.movie.actors = data.Actors;
          this.movie.reviews = [];
          this.movieService.addMovie(this.movie);
        },
        error => console.error(error)
      )
    // this.movieArray.forEach(movie => this.movieService.addMovie(movie))
    this.movieService.findAllMovies()
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      )
  }

  public getMovies(term: string): void {
    this.movieService.searchMoviesByApiGeneric(term)
      .subscribe(
        data => {
          this.moviesArray = data['Search']
          console.log(this.moviesArray)
        },
        error => console.error(error)
      )
  }
  public movieSelect(id: number): void {
    this.router.navigateByUrl('movie-detail/id')
  }

}
