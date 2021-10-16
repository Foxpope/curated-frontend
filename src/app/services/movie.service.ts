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
    console.log(movie);
    this.http.post<Movie>(`${url}/add`, movie, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe()
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

  public searchMoviesByApiSpecific(movie: string): Observable<any> {
    return this.http.get<any>(`http://www.omdbapi.com/?t=${movie}&apikey=81dd7f9d`)
      .pipe(
        catchError(this.handleError)
      )
  }

  public searchMoviesByApiGeneric(movie: string): Observable<any[]> {
    return this.http.get<any[]>(`http://www.omdbapi.com/?s=${movie}&apikey=81dd7f9d`)
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
