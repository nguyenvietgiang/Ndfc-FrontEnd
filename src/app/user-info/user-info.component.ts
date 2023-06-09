import { Component, OnInit } from '@angular/core';

import { UserService } from '../Services/usersv.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userData: any;
  constructor(private userservice: UserService) { }

  ngOnInit(): void {
    if (!this.userservice.isLoggedIn()) {
      // Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
      return;
    }
    this.userInfor();
  }
  userInfor(): void {
    const userInfo$ = this.userservice.getUserInfo();
    if (userInfo$) {
      userInfo$.subscribe(
        (data) => {
          this.userData = data;
        },
        error => {
          // Xử lý lỗi khi gửi yêu cầu
          console.error(error);
        }
      );
    } else {
      // Xử lý khi không có thông tin người dùng
    }
  }  
}
