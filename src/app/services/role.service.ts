import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/api/v1"]

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  constructor(private http: HttpClient) { }

  getAllRole(): Observable<any> {
    return this.http.get(BASE_URL + "/roles");
  }

  getRoleById(id: any): Observable<any> {
    return this.http.get(BASE_URL + "/roles/" + id);
  }
}
