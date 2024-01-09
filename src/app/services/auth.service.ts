import { Injectable } from '@angular/core';
import {environment} from '../../environments/environments'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/auth`

  constructor(private http:HttpClient,private cookieService: CookieService) { }
  saveTokenToCookie(token: string): void {
    this.cookieService.set('jwtToken', token);
  }

  getTokenFromCookie(): string | undefined {
    return this.cookieService.get('jwtToken');
  }

  removeTokenFromCookie(): void {
    this.cookieService.delete('jwtToken');
  }
  login(payload: any):Observable<any>{
    const apiUrl = `${this.baseUrl}/login`;
    return this.http.post<any>(apiUrl,payload);
  }
}
