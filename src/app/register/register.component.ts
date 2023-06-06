import { Component, OnInit } from '@angular/core';
import { RegistersvService } from '../Services/registersv.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  message: string = '';
  errorMessage: string = '';
  newData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private registersv : RegistersvService,
  ) { }

  ngOnInit(): void {
  }
  
  register(): void {
    this.validateForm(); // Gọi hàm validateForm() trước khi đăng ký
    
    if (this.message !== '') {
      return; // Nếu có lỗi trong dữ liệu, không gửi yêu cầu đăng ký
    }
  
    this.registersv.registers(this.newData.username, this.newData.email, this.newData.password).subscribe(
      response => {
        this.message = 'Đăng ký tài khoản thành công';
      },
      error => {
        if (error.status === 400 && error.error === 'This Email has been used') {
          this.message = 'Email này đã được sử dụng';
        } else {
          this.message = 'Đã xảy ra lỗi khi đăng ký tài khoản.';
        }
      }
    );
  }
  
  
  validateForm() {
    if (!this.isValidEmail(this.newData.email)) {
      this.message = 'Email không hợp lệ';
      return;
    }

    if (this.newData.username.length < 6) {
      this.message = 'Tên tài khoản phải có ít nhất 6 ký tự';
      return;
    }

    if (this.newData.password.length < 6) {
      this.message = 'Mật khẩu phải có ít nhất 6 ký tự';
      return;
    }
  }

  isValidEmail(email: string) {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
