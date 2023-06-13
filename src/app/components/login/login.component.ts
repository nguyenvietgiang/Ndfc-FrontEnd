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
        sessionStorage.setItem('username', response.username); // Lưu tên người dùng vào sessionStorage
         // Chuyển hướng đến trang chính
      this.router.navigateByUrl('/').then(() => {
        // Reload trang
        window.location.reload();
      });
      },
      error => {
        // Xử lý lỗi đăng nhập
        this.message = 'Sai tên tài khoản hoặc mật khẩu.';
      }
    );
  }
}



