import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SummonerService {

  private _apiUrl = "http://localhost:3001";

  constructor(private http: HttpClient) { }

  getSummoners() {
    const url = `${this._apiUrl}/allSummonerNames`;
    return this.http.get<any>(url, {responseType: 'json'});
  }

  getSummonerStats(summonerName: string) {
    const url = `${this._apiUrl}/summonerStats/${summonerName}`;
    return this.http.get<any>(url, {responseType: 'json'});
  }
}
