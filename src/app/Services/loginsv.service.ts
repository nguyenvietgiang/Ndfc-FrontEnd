import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginsvService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/Auth/login`;
    const body = { username: username, password: password };
    return this.http.post<any>(url, body);
  }
}
