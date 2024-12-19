import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = ["http://localhost:8080/api/v1"]

@Injectable({
    providedIn: 'root'
})
export class AdminService {

    constructor(private http: HttpClient) { }

    getAllUser(): Observable<any> {
        return this.http.get(BASE_URL + "/users");
    }

    createUser(body: any): Observable<any> {
        return this.http.post(BASE_URL + "/users", body);
    }
}
