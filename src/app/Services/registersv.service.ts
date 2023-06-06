import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistersvService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  registers(username: string,email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/Auth/register`;
    const body = { username: username,email: email, password: password };
    return this.http.post<any>(url, body);
  }
}
