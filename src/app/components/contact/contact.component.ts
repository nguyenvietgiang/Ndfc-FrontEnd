import { Component, OnInit } from '@angular/core';
import { ContactsvService } from 'src/app/Services/contactsv.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message: string = '';
  newData = {
    name: '',
    email: '',
    topic: '',
    detail: ''
  };

  constructor(private contactsv: ContactsvService) { }

  ngOnInit(): void {
  }

  sendContactForm(): void {
    this.contactsv.SendContact(this.newData.name, this.newData.email, this.newData.topic, this.newData.detail)
      .subscribe(
        response => {
          // Xử lý kết quả thành công từ API
          this.message = 'Gửi liên hệ thành công';
        },
        error => {
          // Xử lý lỗi từ API
          this.message = 'Đã xảy ra lỗi khi gửi liên hệ';
        }
      );
  }
}

