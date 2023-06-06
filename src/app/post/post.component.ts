import { Component, OnInit } from '@angular/core';
import { HomesvService } from '../Services/homesv.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  newsData: any;
  filterName: string = '';
  constructor(private homeService: HomesvService, private sanitizer: DomSanitizer, private route: ActivatedRoute) { }

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.filterName = params['name'] || '';
    this.getNewsData();
  });
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
}
