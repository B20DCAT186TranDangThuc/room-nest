import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/api/v1"]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(registerForm: any): Observable<any> {
    return this.http.post(BASE_URL + "/auth/register", registerForm);
  }

  getAvatarUser(idUser: number): Observable<any> {
    return this.http.get(BASE_URL + "/images/avatar/" + idUser);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "/auth/login", loginRequest);
  }

  refreshAccessToken(): Observable<any> {
    return this.http.get(BASE_URL + "/auth/refresh");
  }

}
