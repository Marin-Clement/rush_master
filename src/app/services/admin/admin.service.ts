import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as CryptoJS from 'crypto-js'; // Import CryptoJS

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3001';
  private apiKey = 'bad211b2bea4479050e75170912551ad';
  private loginCache: any = null;


  constructor(private http: HttpClient) {
    this.loadLoginState();
  }

  getStatus(): Observable<any> {
    const url = `${this.apiUrl}/status`;
    const headers = new HttpHeaders().set('API-KEY', this.apiKey);

    return this.http.get<any>(url, { headers, responseType: 'json' });
  }

  login(password: string): Observable<any> {
    // Generating a 256-bit encryption key
    const encryptionKey = CryptoJS.lib.WordArray.random(256 / 8).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, encryptionKey).toString();

    const loginData = {
      encryptedPassword: encryptedPassword,
      encryptionKey: encryptionKey
    };

    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  refreshAll(): Observable<any> {
    const url = `${this.apiUrl}/refreshAll`;
    const headers = new HttpHeaders().set('API-KEY', this.apiKey);

    return this.http.post<any>(url, null, {headers, responseType: 'json'});
  }

  addSummoner(summonerName: string): Observable<any> {
    const url = `${this.apiUrl}/addSummoner/${summonerName}`;
    const headers = new HttpHeaders().set('API-KEY', this.apiKey);

    return this.http.post<any>(url, null, { headers, responseType: 'json' });
  }

  deleteSummoner(summonerName: string): Observable<any> {
    const url = `${this.apiUrl}/deleteSummoner/${summonerName}`;
    const headers = new HttpHeaders().set('API-KEY', this.apiKey);

    return this.http.post<any>(url, null, { headers, responseType: 'json' });
  }

  // Save login state to local storage
  saveLoginState(data: any): void {
    this.loginCache = data;
    localStorage.setItem('loginData', JSON.stringify(data));
  }

  // Load login state from local storage
  loadLoginState(): void {
    const loginData = localStorage.getItem('loginData');
    if (loginData) {
      this.loginCache = JSON.parse(loginData);
    }
  }

  // Clear login state (logout)
  clearLoginState(): void {
    this.loginCache = null;
    localStorage.removeItem('loginData');
  }

  get isLoggedIn(): boolean {
    return !!this.loginCache; // Check if there's login data in the cache
  }
}
