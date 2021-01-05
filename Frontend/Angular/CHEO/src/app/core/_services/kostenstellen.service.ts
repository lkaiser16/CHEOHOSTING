import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/global-constants';
import { Observable } from 'rxjs';
import { KostenstelleDto } from '../../dtos/KostenstelleDto';

@Injectable({
  providedIn: 'root'
})
export class KostenstellenService {

  constructor(public http: HttpClient, public globals: Globals) { }

  url: string = this.globals.URL + '/Kostenstelle';

  getAllKostenstellen(): Observable<KostenstelleDto[]> {
    return this.http.get<KostenstelleDto[]>(this.url);
  }

  getKostenstelleById(kostenstelleId: number): Observable<KostenstelleDto> {
    const fullURL = this.url + '/' + kostenstelleId;
    return this.http.get<KostenstelleDto>(fullURL)
  }

  postKostenstelle(data: KostenstelleDto): Observable<KostenstelleDto>
  {
    return this.http.post<KostenstelleDto>(this.url, data);
  }

  putKostenstelle(data: KostenstelleDto): Observable<KostenstelleDto> {
    const fullURL = this.url + '/' + data.kostenstellenId;
    return this.http.put<KostenstelleDto>(fullURL, data);
  }

  deleteKostenstelle(data: number): Observable<{}> {
    const fullURL = `${this.url}/${+data}`;
    return this.http.delete<KostenstelleDto>(fullURL);
  }

  checkIfBestellungContainsKostenstelle(data: number): Observable<boolean>{
    const fullURL = `${this.url}/CheckIfBestellungContainsKostenstelle/${+data}`;
    return this.http.get<boolean>(fullURL);
  }
}
