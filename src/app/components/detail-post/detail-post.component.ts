import { Component, OnInit } from '@angular/core';
import { PostsvService } from 'src/app/Services/postsv.service';
import { ActivatedRoute, Params } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail-post',
  templateUrl: './detail-post.component.html',
  styleUrls: ['./detail-post.component.css']
})
export class DetailPostComponent implements OnInit {
  commentDetail: any;
  newsDetail: any;
  id: string = '';
  comment: string = '';

  constructor(private postdtsv: PostsvService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'] || '';
      this.getDetail(this.id);
      this.getComments(this.id);
    });
  }
  
  getDetail(id: string): void {
    this.postdtsv.getNewsDetail(id).subscribe(
      (data) => {
        this.newsDetail = data;
        this.newsDetail.safeImg = this.sanitizer.bypassSecurityTrustResourceUrl(data.image);
      },
      (error) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }  

  getComments(postId: string): void {
    this.postdtsv.getCommentsByPostId(postId).subscribe(
      (data) => {
        this.commentDetail = data;
      },
      (error) => {
        console.error('Lỗi khi gọi API', error);
      }
    );
  }
  
  submitComment(): void {
    if (this.postdtsv.isLoggedIn()) {
      this.route.queryParams.subscribe((params: Params) => {
        const postId = params['id']; // lấy PostID từ query parameters
        const parentCommentId = ''; 
    
        const content = this.comment; 
    
        this.postdtsv.postComment(content, postId, parentCommentId).subscribe(
          (response) => {
            // Handle successful response
            this.clearCommentInput();
            this.refreshComments();
          },
          (error) => {
            // Handle error
            console.error('Lỗi khi đăng bình luận', error);
          }
        );
      });
    } else {
      alert('Bạn cần đăng nhập để bình luận.');
    }
  }
  
  clearCommentInput(): void {
    this.comment = '';
  }

  refreshComments(): void {
    this.route.queryParams.subscribe((params: Params) => {
      const postId = params['id']; // Get the value of 'id' from the query parameters
      this.getComments(postId);
    });
  }  
  deleteComment(commentId: string): void {
    this.postdtsv.deleteComment(commentId).subscribe(
      () => {
        alert('Đã xóa bình luận.');
        this.refreshComments();
      },
      (error) => {
        alert('Bạn không có quyền xóa bình luận này.');
      }
    );
  }
}

