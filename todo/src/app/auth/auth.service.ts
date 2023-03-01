import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable,catchError,throwError} from 'rxjs';
import {tap } from 'rxjs/operators';
import {Data} from './data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  loginUrl='https://dummyjson.com/auth/login';
  reqHeader = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  constructor(private http:HttpClient){}
  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;
  
  login(data:Data): Observable<any> {
    return this.http.post(this.loginUrl,data,{observe:'response',headers:this.reqHeader}).pipe(
      tap(()=>this.isLoggedIn=true),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    )
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  getAuthorizationToken(){
    return localStorage.getItem('token');
  }
}