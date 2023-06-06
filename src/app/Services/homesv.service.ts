import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomesvService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient ) {}

  getSlideData(): Observable<any> {
    const url = `${this.apiUrl}/Slider`;
    return this.http.get(url);
}
getNewsData(name: string = ""): Observable<any> {
  let url = `${this.apiUrl}/News`;
  if (name) {
    url = `${this.apiUrl}/News?searchTitle=${name}`;
  }
  return this.http.get(url);
}
  getVideosData(): Observable<any> {
  const url = `${this.apiUrl}/Video`;
  return this.http.get(url);
}
}
