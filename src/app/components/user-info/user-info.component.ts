import { Component, OnInit } from '@angular/core';
import { UserService } from '../../Services/usersv.service';

@Component({
selector: 'app-user-info',
templateUrl: './user-info.component.html',
styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
userData: any;
showChangePasswordDialog: boolean = false;
currentPassword: string = '';
newPassword: string = '';

constructor(private userservice: UserService) { }

ngOnInit(): void {
if (!this.userservice.isLoggedIn()) {
// Người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
return;
}
this.userInfo();
}

userInfo(): void {
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

openChangePasswordDialog(): void {
this.showChangePasswordDialog = true;
}

closeChangePasswordDialog(): void {
this.showChangePasswordDialog = false;
}

savePassword(): void {
this.userservice.changePassword(this.currentPassword, this.newPassword).subscribe(
(response) => {
console.log('Mật khẩu đã được thay đổi.');
// Thực hiện các thao tác khác sau khi đổi mật khẩu thành công
this.closeChangePasswordDialog(); // Đóng dialog sau khi thay đổi mật khẩu thành công
},
(error) => {
console.error('Đã xảy ra lỗi khi đổi mật khẩu:', error);
}
);
}
}


