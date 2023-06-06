import { Component, OnInit } from '@angular/core';
import { HomesvService } from './Services/homesv.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: string = '';
  title = 'Ndfc-FrontEnd';
  newsData: any;

  constructor(
    private homeService: HomesvService,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    const token = this.cookieService.get('token');
    this.isLoggedIn = token ? true : false;
    // Nếu người dùng đã đăng nhập, lấy thông tin tên người dùng từ sessionStorage
    if (this.isLoggedIn) {
      this.username = sessionStorage.getItem('username') || '';
    }
    this.getNewsData();
  }

  getNewsData(): void {
    this.homeService.getNewsData().subscribe(
      (data) => {
        this.newsData = data.content;
      },
      (error) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }

  logout(): void {
    // Xử lý đăng xuất, bao gồm xóa token khỏi cookie, xóa tên người dùng từ sessionStorage và thực hiện các bước cần thiết khác
    this.cookieService.delete('token');
    sessionStorage.removeItem('username');
    // Thực hiện các bước khác (ví dụ: chuyển hướng đến trang đăng nhập)
     // Reload trang
     location.reload();
  }
}

