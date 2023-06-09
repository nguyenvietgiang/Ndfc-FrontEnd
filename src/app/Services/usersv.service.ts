import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private cookieService: CookieService, private router: Router, private http: HttpClient) { }

  private usernameSubject = new Subject<string>();
  username$ = this.usernameSubject.asObservable();
 
  setUsername(username: string) {
    this.usernameSubject.next(username);
  }

  getUsername() {
    return this.usernameSubject.asObservable();
  }

  getToken(): string {
    // Lấy token từ cookie
    return this.cookieService.get('token');
  }
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) {
      this.router.navigateByUrl('/dangnhap');
      alert('Bạn cần đăng nhập để xem thông tin người dùng.');
      return false;
    }
    return true;
  }

  getUserInfo() {
    const url = `${this.apiUrl}/Auth/userinfo`;
    const token = this.cookieService.get('token');
    if (token) {
      const headers = { Authorization: `Bearer ${token}` };
      return this.http.get<any>(url, { headers });
    }
    return null; // Hoặc có thể trả về Observable rỗng: return of(null);
  }
}
