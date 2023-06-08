import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactsvService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  SendContact(name: string, email: string, topic: string, detail: string): Observable<any> {
    const url = `${this.apiUrl}/Contact`;
    const body = { name: name, email: email, topic: topic, detail: detail };
    return this.http.post<any>(url, body);
  }
}
