import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) { }

  public getGames(summonerName: string | null): Observable<any> {
    const url = `http://localhost:3001/summonerMatches/${summonerName}`;

    // Check if the data is in the cache
    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }

    const request = this.http.get<any>(url, { responseType: 'json', headers: { 'API-KEY': 'bad211b2bea4479050e75170912551ad' } });

    // Cache the data after fetching it
    request.subscribe(data => this.cache.set(url, data));

    return request;
  }

  public getMatchDetails(matchId: string, summonerName: string | null): Observable<any> {
    const url = `http://localhost:3001/summonerMatchesDetails/${matchId}/${summonerName}`;

    // Check if the data is in the cache
    //  if (this.cache.has(url)) {
    //    return of(this.cache.get(url));
    //  }

    const request = this.http.get<any>(url, { responseType: 'json', headers: { 'API-KEY': 'bad211b2bea4479050e75170912551ad' } });

    // Cache the data after fetching it
    request.subscribe(data => this.cache.set(url, data));

    return request;
  }

  public getSummonerHistoryStats(summonerName: string | null): Observable<any> {
    const url = `http://localhost:3001/summonerHistoryStats/${summonerName}`;

    // Check if the data is in the cache
    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }

    const request = this.http.get<any>(url, { responseType: 'json', headers: { 'API-KEY': 'bad211b2bea4479050e75170912551ad' } });

    // Cache the data after fetching it
    request.subscribe(data => this.cache.set(url, data));

    return request;
  }

  public getChampionJson(): Observable<any> {
    const url = `http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion.json`;

    // Check if the data is in the cache
    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }

    const request = this.http.get<any>(url, {responseType: 'json'});

    // Cache the data after fetching it
    request.subscribe(data => this.cache.set(url, data));

    return request;
  }
}
