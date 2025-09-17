import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EtudiantDetail } from '../../models/etudiant/etudiantDetail.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Reponse } from '../../models/reponse.model';
import { PagedEtudiantList } from '../../models/etudiant/pagedEtudiantList.model';
import { EtudiantUpdate } from '../../models/etudiant/etudiantUpdate.model';
import { PagedEtudiantWithEcolageList } from '../../models/etudiant/pagedEtudiantWithEcolageList.model';

@Injectable({
  providedIn: 'root',
})
export class EtudiantService {
  constructor(private http: HttpClient) {}
  apiUrlEtudiant: string = `${environment.apiUrl}/etudiant`;

  saveNewEtudiant(etudiant: EtudiantDetail): Observable<Reponse> {
    console.log('appel saveNewEtudiant dans EtudiantService');
    return this.http.post<Reponse>(this.apiUrlEtudiant, etudiant);
  }

  getPagedEtudiantList(paged: {
    keyword: string;
    etat: string;
    page: number;
    size: number;
  }): Observable<PagedEtudiantList> {
    let params = new HttpParams()
      .set('keyword', paged.keyword)
      .set('etat', paged.etat)
      .set('page', paged.page)
      .set('size', paged.size);
    console.log('Récupération de la liste des étudiant');
    return this.http.get<PagedEtudiantList>(this.apiUrlEtudiant, {
      params: params,
    });
  }

  getEtudiantDetailById(id: number): Observable<EtudiantDetail> {
    return this.http.get<EtudiantDetail>(`${this.apiUrlEtudiant}/${id}`);
  }

  updateEtudiant(etudiantToUpdate: EtudiantUpdate): Observable<Reponse> {
    console.log('update etudiant');
    return this.http.patch<Reponse>(this.apiUrlEtudiant, etudiantToUpdate);
  }

  getPagedEtudiantWithEcolage(
    keyword: string,
    etat: string,
    page: number,
    size: number,
    mois: number,
    annee: number
  ): Observable<PagedEtudiantWithEcolageList> {
    console.log('Récuperation de la paged list etudiant with ecolage');
    let params = new HttpParams()
      .set('keyword', keyword)
      .set('etat', etat)
      .set('page', page)
      .set('size', size)
      .set('mois', mois)
      .set('annee', annee);

    return this.http.get<PagedEtudiantWithEcolageList>(
      `${this.apiUrlEtudiant}/ecolage`,
      { params: params }
    );
  }
}
