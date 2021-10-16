import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Movie } from '../models/movie';
import { awsUrl, localUrl } from 'src/environments/environment';
import { catchError, map } from "rxjs/operators";
import { of } from 'rxjs';

const url = localUrl + "/movies";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public findAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  public addMovie(movie: Movie): void {
    this.http.post<Movie>(`${url}/add`, movie, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public findByMovieId(id: string): Observable<Movie> {
    return this.http.get<Movie>(`${url}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  public searchMovies(term: string): Observable<Movie[]> {
    if(!term.trim()) {
      return of([])
    }
    return this.http.get<Movie[]>(`${url}/search/?q=${term}`).
    pipe(
      catchError(this.handleError)
    )
  }

  public searchMoviesByApi(movie: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(`http://www.omdbapi.com/?s=${movie}&apikey=81dd7f9d`)
      .pipe(
        catchError(this.handleError)
      )
  }


  private handleError(httpError: HttpErrorResponse) {
    if (httpError instanceof ErrorEvent) {
      console.log('And error occurred: ', httpError);
    }
    else {
      console.error(`
        Backend returned code ${httpError.status},
        body was: ${httpError.error}
      `)
    }
    return throwError('Something bad happened; please try again later');
  }
}
