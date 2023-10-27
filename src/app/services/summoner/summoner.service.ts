import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummonerService {
  private cache = new Map<string, any>();
  private _apiUrl = "http://localhost:3001";

  constructor(private http: HttpClient) { }

  getSummonerInfo(summonerName: string | null): Observable<any> {
    const url = `${this._apiUrl}/summonerInfo/${summonerName}`;

    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }

    const request = this.http.get<any>(url, { responseType: 'json', headers: { 'API-KEY': 'bad211b2bea4479050e75170912551ad' } });

    request.subscribe(data => this.cache.set(url, data));

    return request;
  }

  getSummoners() {
    const url = `${this._apiUrl}/allSummonerNames`;

    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }

    const request = this.http.get<any>(url, { responseType: 'json', headers: { 'API-KEY': 'bad211b2bea4479050e75170912551ad' } });

    request.subscribe(data => this.cache.set(url, data));

    return request;
  }

  getSummonerStats(summonerName: string): Observable<any> {
    const url = `${this._apiUrl}/summonerStats/${summonerName}`;

    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }

    const request = this.http.get<any>(url, { responseType: 'json',headers: { 'API-KEY': 'bad211b2bea4479050e75170912551ad' } });

    request.subscribe(data => this.cache.set(url, data));

    return request;
  }

  getLiveGameInfo(): Observable<any> {
    const url = `${this._apiUrl}/playersInGame`;

    if (this.cache.has(url)) {
      return of(this.cache.get(url));
    }

    const request = this.http.get<any>(url, { responseType: 'json', headers: { 'API-KEY': 'bad211b2bea4479050e75170912551ad'} });

    request.subscribe(data => this.cache.set(url, data));

    return request;
  }
}
