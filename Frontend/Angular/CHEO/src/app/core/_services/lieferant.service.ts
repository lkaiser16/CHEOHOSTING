import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/global-constants';
import { Observable } from 'rxjs';
import { LieferantDto } from '../../dtos/LieferantDto';

@Injectable({
  providedIn: 'root'
})
export class LieferantService {

  constructor(public http: HttpClient, public globals: Globals) { }
  url: string = this.globals.URL + '/Lieferant';

  getAllLieferanten(): Observable<LieferantDto[]> {
    return this.http.get<LieferantDto[]>(this.url);
  }

  getLieferantById(lieferantId): Observable<LieferantDto> {
    const finalURL = this.url + '/' + lieferantId;
    return this.http.get<LieferantDto>(finalURL);
  }

  postLieferant(data: LieferantDto): Observable<LieferantDto>
  {
    return this.http.post<LieferantDto>(this.url, data);
  }

  putLieferant(data: LieferantDto): Observable<LieferantDto> {
    const fullURL = this.url + '/' + data.lieferantId;
    return this.http.put<LieferantDto>(fullURL, data);
  }

  deleteLieferant(data: number): Observable<{}> {
    const fullURL = `${this.url}/${+data}`;
    return this.http.delete<LieferantDto>(fullURL);
  }

  checkIfArtikelContainsLieferant(data: number): Observable<boolean>{
    const fullURL = `${this.url}/CheckIfArtikelContainsLieferant/${+data}`;
    return this.http.get<boolean>(fullURL);
  }

}
