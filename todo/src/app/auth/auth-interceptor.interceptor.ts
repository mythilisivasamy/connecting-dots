import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private auth:AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken:string = this.auth.getAuthorizationToken()!;
    
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken).set('withCredentials','true')
    });
    console.log('authReq',authReq)
    return next.handle(authReq);
  }
}
