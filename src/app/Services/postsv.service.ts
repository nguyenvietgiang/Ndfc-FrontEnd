import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsvService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient ) {}

  getNewsDetail(id: string = ""): Observable<any> {
    
    const url = `${this.apiUrl}/News/${id}`;
    return this.http.get(url);
  }

  getCommentsByPostId(postId: string): Observable<any> {
    const url = `${this.apiUrl}/Comment/${postId}`;
    return this.http.get<any>(url);
  }
}
