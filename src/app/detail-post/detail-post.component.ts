import { Component, OnInit } from '@angular/core';
import { PostsvService } from '../Services/postsv.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {
  newsDetail: any;
  id: string = '';
  constructor(private postdtsv: PostsvService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || '';
      this.getdetail(this.id);
    });
  }
  
  getdetail(id: string) {
    this.postdtsv.getNewsDetail(id).subscribe(
      (data) => {
        this.newsDetail = data;
       data.safeImg = this.sanitizer.bypassSecurityTrustResourceUrl(data.image);
      },
      (error) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }  
}
