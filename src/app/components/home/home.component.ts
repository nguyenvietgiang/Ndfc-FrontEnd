import { Component, OnInit } from '@angular/core';
import { HomesvService } from 'src/app/Services/homesv.service';
//sử lý các tệp tin lấy từ localhost
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slideData: any;
  newsData: any;
  videoData: any;
  filterName: string = '';
  constructor(private homeService: HomesvService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getSlideData();
    this.getNewsData();
    this.getVideosData();
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

  getNewsData(): void {
    this.homeService.getNewsData(this.filterName).subscribe(
      (data) => {
        this.newsData = data.content;
        // Xử lý URL để tạo URL an toàn
        this.newsData.forEach((item: any) => {
          item.safeImg = this.sanitizer.bypassSecurityTrustResourceUrl(item.image);
        });
      },
      (error) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }
  
  getVideosData(): void {
    this.homeService.getVideosData().subscribe(
      (data) => {
        this.videoData = data.content;
        // Xử lý URL để tạo URL an toàn
        this.videoData.forEach((item: any) => {
          item.safeVideo = this.sanitizer.bypassSecurityTrustResourceUrl(item.sVideo);
        });
      },
      (error) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }
}