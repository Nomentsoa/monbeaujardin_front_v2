import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Ecolage } from '../../models/ecolages/ecolage.model';

@Injectable({
  providedIn: 'root',
})
export class EcolageService {
  apiUrlEtudiant: string = `${environment.apiUrl}/ecolage`;

  constructor(private http: HttpClient) {}

  getEcolageByIdEtudiantAndMoisAndAnnee(
    idEtudiant: number,
    mois: number,
    annee: number
  ): Observable<Ecolage> {
    console.log('Récupération ecolage par etudiant par mois et par annee');
    let params = new HttpParams()
      .set('idEtudiant', idEtudiant)
      .set('mois', mois)
      .set('annee', annee);
    return this.http.get<Ecolage>(this.apiUrlEtudiant, { params: params });
  }
}
