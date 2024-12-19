import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
    private message: NzMessageService,
    private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = StorageService.getToken();
    if (token) {
      let headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${token}`,
      );
      if (
        !request.url.includes('UploadFile') &&
        !request.url.includes('import') &&
        !request.url.includes('upload-attachment') &&
        !request.url.includes('upload')
      ) {
        headers = headers.append('content-type', 'application/json');
      }
      request = request.clone({
        headers,
      });
    }

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(event);

          }
        },
        (err: any) => {
          if (!request.url.includes("/auth/login")) {
            if (err.status === 401) {
              this.message.warning("Phiên đăng nhập đã hết hạn! vui lòng đăng nhập lại", { nzDuration: 2000 });
              this.authService.logout();
            } else {
              this.message.error("Lỗi hệ thông!", { nzDuration: 2000 });
            }
          }

        },
      )
    );
  }
}
