import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { AccessToken } from '../../models/authentification/accessToken.model';
import { RequestToken } from '../../models/authentification/requestToken.model';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  accessToken!: string;
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  doAuthentification(requestToken: RequestToken) {
    console.log(requestToken);
    this.http
      .post<AccessToken>(
        `${environment.apiUrlAuthentification}/token`,
        requestToken
      )
      .subscribe({
        next: (value) => {
          console.log('la valeur du token est: ' + value.accessToken);
          this.accessToken = value.accessToken;
          this.router.navigate(['etudiant']);
          this.cookieService.set('accessToken', this.accessToken, {
            sameSite: 'Strict',
            secure: true,
          });
        },
        error: (err) =>
          console.log('erreur sur la recuperation du token: ' + err),
      });
  }

  getToken(): string {
    return this.accessToken;
  }
}
