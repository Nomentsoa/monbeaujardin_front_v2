import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable, ObservableLike } from 'rxjs';
import { PayEcolage } from '../../models/ecolage/payEcolage.model';
import { Reponse } from '../../models/reponse.model';

@Injectable({
  providedIn: 'root',
})
export class EcolageService {
  apiUrlEcolage: string = `${environment.apiUrl}/ecolage`;

  constructor(private http: HttpClient) {}

  payEcolage(payEcolage: PayEcolage): Observable<Reponse> {
    console.log('appel pour payer ecolage etudiant - EcolageService');
    return this.http.post<Reponse>(this.apiUrlEcolage, payEcolage);
  }
}
