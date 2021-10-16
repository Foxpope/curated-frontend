import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  movies$!: Observable<Movie[]>
  movie = new Movie('', '', 0, '', '', '', '', '', '', '', '', '', []);
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService, private router: Router) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.movies$ = this.searchTerms.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((term: string) => this.movieService.searchMovies(term))
    )
  }

  public searchApi(movie: string) {
    this.movieService.searchMoviesByApiSpecific(movie)
      .subscribe(
        // data => data.forEach(movie => this.movieService.addMovie(movie)),
        data => {
          console.log(data)
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

  public movieSelect(id: number): void {
    this.router.navigateByUrl('movie-detail')
  }
}
