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

  public movieSelect(id: number): void {
    this.router.navigateByUrl('movie-detail')
  }
}
