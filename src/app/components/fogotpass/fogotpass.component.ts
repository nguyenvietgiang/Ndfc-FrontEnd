import { Component } from '@angular/core';
import { RegistersvService } from 'src/app/Services/registersv.service';

@Component({
  selector: 'app-fogotpass',
  templateUrl: './fogotpass.component.html',
  styleUrls: ['./fogotpass.component.css']
})
export class FogotpassComponent {
  newData: any = {};
  errorMessage: string | null = null;

  constructor(private registerService: RegistersvService) { }

  forgotPassword(email: string): void {
    this.errorMessage = null; // Reset the error message before making the API call

    this.registerService.forgotPassword(email).subscribe(
      () => {
        console.log('Mật khẩu đã được reset và gửi đến địa chỉ email đã đăng ký.');
      },
      (error) => {
        console.error('Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu:', error);
        this.errorMessage = 'Đã xảy ra lỗi khi gửi yêu cầu đặt lại mật khẩu.';
      }
    );
  }
}


