import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../Models/player.model';

@Injectable({
  providedIn: 'root'
})
export class GamesvService {
  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  getPlayerRandom(): Observable<Player> {
    const url = `${this.apiUrl}/Player/random`;
    return this.http.get<Player>(url); 
  }
}
