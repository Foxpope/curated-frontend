import { localUrl } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { awsUrl } from 'src/environments/environment.prod';


const url = awsUrl;

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if(req.url.startsWith(awsUrl)){
      const jwt = sessionStorage.getItem('token');
      if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
        req = req.clone({
          setHeaders: {
            "Authorization": `Bearer ${jwt}`
          }
        })
      }
      return next.handle(req);
    } else {
        return next.handle(req);
    }
  }
}
