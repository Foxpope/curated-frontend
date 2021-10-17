import { localUrl } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';


const url = localUrl;

@Injectable({
  providedIn: 'root'
})
export class BasicAuthHtppInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req);
    if(req.url.startsWith(localUrl)){
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
