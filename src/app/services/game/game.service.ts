import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  public getGames(summonerName: string | null) {
    const url = `http://localhost:3001/summonerMatches/${summonerName}`;
    return this.http.get<any>(url, {responseType: 'json'});
  }
  public getMatchDetails(matchId: string, summonerName: string | null) {
    const url = `http://localhost:3001/summonerMatchesDetails/${matchId}/${summonerName}`;
    return this.http.get<any>(url, {responseType: 'json'});
  }
}
