import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MatchsvService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getMatches(): Observable<any> {
    const url = `${this.apiUrl}/Match`;
    return this.http.get<any>(url);
  }
}
