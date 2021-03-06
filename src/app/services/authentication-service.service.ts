import { localUrl } from 'src/environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { awsUrl } from 'src/environments/environment.prod';

const url = awsUrl;

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient) { }
  // Provide username and password for authentication, and once authentication is successful,
  //store JWT token in session
  authenticate(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${url}/authenticate`, { username, password })
      .pipe(
        catchError(this.handleError),
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenStr = userData.token;
          sessionStorage.setItem("token", tokenStr);
          return userData;
        })
      );
  }

  get isLoggedIn(): boolean {
    let authToken = sessionStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }

  logOut() {
    sessionStorage.removeItem("username");
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
