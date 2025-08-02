import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EtudiantDetail } from '../../models/etudiant/etudiantDetail.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Reponse } from '../../models/reponse.model';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  constructor(private http: HttpClient) {}

  saveNewEtudiant(etudiant: EtudiantDetail): Observable<Reponse> {
    console.log('appel saveNewEtudiant dans EtudiantService');
    return this.http.post<Reponse>(`${environment.apiUrl}/etudiant`, etudiant);
  }
}
