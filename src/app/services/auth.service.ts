import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

const BASE_URL = ["http://localhost:8080/api/v1"]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
    private router: Router
  ) { }

  register(registerForm: any): Observable<any> {
    return this.http.get(BASE_URL + "/auth/register", registerForm);
  }

  getAvatarUser(idUser: number): Observable<any> {
    return this.http.get(BASE_URL + "/images/avatar/" + idUser);
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + "/auth/login", loginRequest);
  }

  refreshToken(): Observable<any> {
    return this.http.get(BASE_URL + "/auth/refresh");
  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
