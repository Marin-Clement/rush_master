import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as CryptoJS from 'crypto-js'; // Import CryptoJS

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

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
}
