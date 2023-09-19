import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcribesvService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  Subcribe(name: string, email: string): Observable<any> {
    const url = `${this.apiUrl}/Subcribe`;
    const body = { name: name, email: email};
    return this.http.post<any>(url, body);
  }
}
