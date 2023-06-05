import { Component, OnInit } from '@angular/core';
import { HomesvService } from '../Services/homesv.service';
//sử lý các tệp tin lấy từ localhost
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideData: any;
  constructor(private homeService: HomesvService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getSlideData();
  }

  getSlideData(): void {
    this.homeService.getSlideData().subscribe(
      (data) => {
        this.slideData = data.content;
        // Xử lý URL để tạo URL an toàn
        this.slideData.forEach((item: any) => {
          item.safeImg = this.sanitizer.bypassSecurityTrustResourceUrl(item.img);
        });
      },
      (error) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }
}