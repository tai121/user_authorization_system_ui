import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = `${environment.apiUrl}/user`

  constructor(private http:HttpClient,private authService: AuthService) { }
  getAll():Observable<any>{
    const apiUrl = `${this.baseUrl}/all`;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getTokenFromCookie())
    return this.http.get<any>(apiUrl,{ headers: headers_object });
  }
  getOne(_id: any):Observable<any>{
    const apiUrl = `${this.baseUrl}`;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getTokenFromCookie())
    const params = new HttpParams().set('userId',_id)
    return this.http.get<any>(apiUrl,{ headers: headers_object,params:params });
  }
  createUser(payload:any):Observable<any>{
    const apiUrl = `${this.baseUrl}`;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getTokenFromCookie())
    return this.http.post<any>(apiUrl,payload,{ headers: headers_object });
  }

  updateUser(payload:any):Observable<any>{
    const apiUrl = `${this.baseUrl}/update`;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getTokenFromCookie())
    return this.http.post<any>(apiUrl,payload,{ headers: headers_object });
  }

  deleteUser(payload:any):Observable<any>{
    const apiUrl = `${this.baseUrl}/delete`;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getTokenFromCookie())
    return this.http.post<any>(apiUrl,payload,{ headers: headers_object });
  }

}
