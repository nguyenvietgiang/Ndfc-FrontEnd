import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsvService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private cookieService: CookieService ) {}

  getNewsDetail(id: string = ""): Observable<any> {
    
    const url = `${this.apiUrl}/News/${id}`;
    return this.http.get(url);
  }

  getCommentsByPostId(postId: string): Observable<any> {
    const url = `${this.apiUrl}/Comment/${postId}`;
    return this.http.get<any>(url);
  }

  
  isLoggedIn(): boolean {
    const token = this.cookieService.get('token'); 
    return !!token;
  }

  postComment(content: string, postId: string, parentCommentId: string): Observable<any> {
    const url = `${this.apiUrl}/Comment`;
    const token = this.cookieService.get('token'); 
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    const body = { content: content, postId: postId, parentCommentId: parentCommentId };
    return this.http.post(url, body, { headers: headers });
  }
  
  deleteComment(commentId: string): Observable<any> {
    const url = `${this.apiUrl}/Comment/${commentId}`;
    const token = this.cookieService.get('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.delete(url, { headers: headers });
  }
  
}
