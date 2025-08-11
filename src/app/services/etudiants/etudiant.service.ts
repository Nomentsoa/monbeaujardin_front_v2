import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EtudiantDetail } from '../../models/etudiant/etudiantDetail.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Reponse } from '../../models/reponse.model';
import { PagedEtudiantList } from '../../models/etudiant/pagedEtudiantList.model';

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
}
