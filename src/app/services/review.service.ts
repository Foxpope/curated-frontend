import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, of, throwError } from 'rxjs';
import { awsUrl, localUrl } from 'src/environments/environment';
import { catchError, map } from "rxjs/operators";
import { Review } from '../models/review';
import { Movie } from '../models/movie';
import { User } from '../models/user';

const url = awsUrl + '/reviews';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  public addReview(review: Review): Observable<Review> {
    // Do this to avoid "object references an unsaved transient instance"
    let userId = Number(JSON.parse(sessionStorage.getItem('userId')!))
    review.movie = new Movie(review.movie.id, '', 0, '', '', '', '', '', '', '', '', '', []);
    review.user = new User(userId, '', '', '', '', '', [], [], []);
    console.log(review)
    return this.http.post<Review>(`${url}/add`, review, this.httpOptions).pipe(catchError(this.handleError))
  }

  public findAllReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${url}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  public updateReview(review: Review): Observable<Review> {
    // Do this to avoid "object references an unsaved transient instance"
    review.movie = new Movie(review.movie.id, '', 0, '', '', '', '', '', '', '', '', '', []);
    review.user = new User(review.user.id, '', '', '', '', '', [], [], []);
    return this.http.put<Review>(`${url}/${review.id}`, review, this.httpOptions).pipe(catchError(this.handleError))
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
