import { Injectable } from '@angular/core';
import { Subject, Observable, empty  } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  changePassword(currentPassword: string, newPassword: string): Observable<string> {
    const url = `${this.apiUrl}/Auth/changepassword`;
    const token = this.cookieService.get('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      const body = {
        currentPassword: currentPassword,
        newPassword: newPassword
      };
      return this.http.put(url, body, { headers, responseType: 'text' }).pipe(
        map(response => response as string)
      );
    }
    return empty();
  }
  
}
