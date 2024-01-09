import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environments';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private baseUrl = `${environment.apiUrl}/permission`

  constructor(private http:HttpClient,private authService: AuthService) { }
  getAll():Observable<any>{
    const apiUrl = `${this.baseUrl}/all`;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getTokenFromCookie())
    return this.http.get<any>(apiUrl,{ headers: headers_object });
  }
  getOne(_id:string):Observable<any>{
    const apiUrl = `${this.baseUrl}`;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getTokenFromCookie())
    const params = new HttpParams().set('permissionId',_id)
    return this.http.get<any>(apiUrl,{ headers: headers_object,params:params });
  }
  update(payload:any):Observable<any>{
    const apiUrl = `${this.baseUrl}/update`;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getTokenFromCookie())
    return this.http.post<any>(apiUrl,payload,{ headers: headers_object });
  }
  delete(payload:any):Observable<any>{
    const apiUrl = `${this.baseUrl}/delete`;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getTokenFromCookie())
    return this.http.post<any>(apiUrl,payload,{ headers: headers_object });
  }
  create(payload:any):Observable<any>{
    const apiUrl = `${this.baseUrl}`;
    var headers_object = new HttpHeaders().set("Authorization", "Bearer " + this.authService.getTokenFromCookie())
    return this.http.post<any>(apiUrl,payload,{ headers: headers_object });
  }
}
