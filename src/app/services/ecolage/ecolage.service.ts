import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EcolageService {
  apiUrlEtudiant: string = `${environment.apiUrl}/ecolage`;

  constructor(private http: HttpClient) {}
}
