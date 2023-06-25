import { Component, OnInit } from '@angular/core';
import { LoginsvService } from 'src/app/Services/loginsv.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string = '';
  newData = {
    username: '',
    password: ''
  };

  constructor(
    private loginsv: LoginsvService,
    private cookieService: CookieService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.loginsv.login(this.newData.username, this.newData.password).subscribe(
      response => {
        // Lưu token vào cookie
        this.cookieService.set('token', response.token);
        this.cookieService.set('refreshToken', response.refreshToken);
        sessionStorage.setItem('username', response.username); // Lưu tên người dùng vào sessionStorage
  
        // Kiểm tra refresh token và gửi yêu cầu lấy token mới nếu cần
        const refreshToken = this.cookieService.get('refreshToken');
        if (refreshToken) {
          this.loginsv.refreshToken(refreshToken).subscribe(
            refreshResponse => {
              const newToken = refreshResponse.token;
              this.cookieService.set('token', newToken);

              this.router.navigateByUrl('/trangchu').then(() => {
                // Reload trang
                window.location.reload();
              });
            },
            refreshError => {
              // Xử lý lỗi khi gửi yêu cầu refresh token
              console.error('Lỗi khi refresh token', refreshError);
              // Xóa refresh token khỏi cookie và chuyển hướng đến trang đăng nhập
              this.cookieService.delete('refreshToken');
              this.router.navigateByUrl('/dangnhap');
            }
          );
        } else {
          // Chuyển hướng đến trang chính
          this.router.navigateByUrl('/trangchu');
        }
      },
      error => {
        // Xử lý lỗi đăng nhập
        this.message = 'Sai tên tài khoản hoặc mật khẩu.';
      }
    );
  }
  
}



