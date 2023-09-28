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
  rememberMe: boolean = false;
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
    const rememberedUsername = localStorage.getItem('rememberedUsername');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    const expirationDate = localStorage.getItem('rememberedUsernameExpiration');
    if (rememberedUsername && expirationDate) {
      const expirationTime = new Date(expirationDate);
      const currentTime = new Date();
      if (currentTime <= expirationTime) {
        this.newData.username = rememberedUsername;
        this.newData.password = '';
        this.rememberMe = true; // Đánh dấu checkbox nhớ tài khoản
      } else {
        // Nếu thời gian đã hết, xóa thông tin đã lưu
        localStorage.removeItem('rememberedUsername');
        localStorage.removeItem('rememberedPassword')
        localStorage.removeItem('rememberedUsernameExpiration');
      }
    }  
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
        if (this.rememberMe) {
          // Lưu tài khoản và timestamp vào localStorage
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 7); // Lưu trong vòng 1 tuần
          localStorage.setItem('rememberedUsername', this.newData.username);
          localStorage.setItem('rememberedPassword', this.newData.password);
          localStorage.setItem('rememberedUsernameExpiration', expirationDate.toISOString());
        } else {
          // Xóa tài khoản đã ghi nhớ nếu người dùng không chọn
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberedPassword');
          localStorage.removeItem('rememberedUsernameExpiration');
        }
      },
      error => {
        this.message = 'Sai tên tài khoản hoặc mật khẩu.';
      }
    );
  }
  
}



