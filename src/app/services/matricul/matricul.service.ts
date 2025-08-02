import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MatriculService {
  constructor(private http: HttpClient) {}

  getDernierMatricul(appartenant: string): Observable<string> {
    console.log('récuperation du dernier matricul');
    let params = new HttpParams();
    params = params.set('appartenant', appartenant);
    return this.http.get<string>(`${environment.apiUrl}/matricul`, {
      params: params,
    });
  }
}
