import { MovieService } from 'src/app/services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})
export class MovieSearchComponent implements OnInit {
  public movieArray: Movie[] = [];
  movies$!: Observable<Movie[]>
  private searchTerms = new Subject<string>();

  constructor(private movieService: MovieService) { }

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
    this.movieService.searchMoviesByApi(movie)
      .subscribe(
        // data => data.forEach(movie => this.movieService.addMovie(movie)),
        data => {
          // this.movieArray.push()
          console.log(data)
        },
        error => console.error(error)
      )
    console.log(this.movieArray)
    this.movieArray.forEach(movie => this.movieService.addMovie(movie))
    this.movieService.findAllMovies()
      .subscribe(
        data => console.log(data),
        error => console.error(error)
      )
  }

}
