import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }

  login() {
    this.isSpinning = true;
    this.authService.login(this.loginForm.value).subscribe((res) => {
      this.isSpinning = false
      console.log(res)
      if (res.user.id !== null) {
        const user = {
          id: res.user.id,
          fullName: res.user.fullName,
          image: res.user.image,
          role: res.user.role
        }
        StorageService.saveUser(user);
        StorageService.saveToken(res.access_token);
        this.authService.login(this.loginForm.value).subscribe(res => {

        });
        this.message.success("Đăng nhập thành công", { nzDuration: 2000 });
        if (StorageService.isAdminLoggedIn()) {
          this.router.navigateByUrl("/admin/dashboard");
        }
        else if (StorageService.isCustomerLoggedIn) {
          this.router.navigateByUrl("/");
        }
      }
    }, (error) => {
      this.isSpinning = false;

      if (error.status === 401) {
        // Lỗi xác thực
        this.message.error("Sai tên đăng nhập hoặc mật khẩu.", { nzDuration: 2000 });
      } else {
        // Các lỗi khác
        this.message.error("Đã xảy ra lỗi. Vui lòng thử lại.", { nzDuration: 2000 });
      }
    })

  }

  refreshCookie() {
    this.authService.refreshToken().subscribe((res => {
      console.log(res);

    }))
  }
}
