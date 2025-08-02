import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { AccessToken } from '../../models/authentification/accessToken.model';
import { RequestToken } from '../../models/authentification/requestToken.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  accessToken!: string;
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  doAuthentification(requestToken: RequestToken): Observable<AccessToken> {
    console.log(requestToken);
    return this.http.post<AccessToken>(
      `${environment.apiUrlAuthentification}/token`,
      requestToken
    );
  }

  setToken(token: string) {
    this.accessToken = token;
  }

  getToken(): string {
    this.accessToken = this.cookieService.get('accessToken');
    return this.accessToken;
  }
}
