import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactsvService } from 'src/app/Services/contactsv.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  message: string = '';
  contactForm!: FormGroup; // FormGroup để quản lý các FormControl

  constructor(private contactsv: ContactsvService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initContactForm();
  }

  initContactForm(): void {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required], // Tên không được để trống
      email: ['', [Validators.required, Validators.email]], // Email không được để trống và phải có dạng email hợp lệ
      subject: ['', Validators.required], // Chủ đề không được để trống
      message: ['', Validators.required] // Nội dung không được để trống
    });
  }

  sendContactForm(): void {
    if (this.contactForm.valid) { // Kiểm tra form có hợp lệ không
      const { name, email, subject, message } = this.contactForm.value;
      this.contactsv.SendContact(name, email, subject, message)
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
    } else {
      this.message = 'Vui lòng điền đầy đủ thông tin';
    }
  }
}



