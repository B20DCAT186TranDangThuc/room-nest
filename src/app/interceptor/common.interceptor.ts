import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = StorageService.getToken();
    console.log("im here");
    if (token) {
      let headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${token}`,
      );
      request = request.clone({
        headers,
        withCredentials: true
      });
    }
    return next.handle(request);
  }
}
