import { Injectable } from '@angular/core';
import { BestellauftragDto } from '../../dtos/BestellauftragDto';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/global-constants';

@Injectable({
  providedIn: 'root'
})
export class BestellauftragService {

  constructor(public http: HttpClient, public globals: Globals) { }

  url: string = this.globals.URL + '/Bestellauftrag';

  getAllBestellauftrag(): Observable<BestellauftragDto[]> {
    return this.http.get<BestellauftragDto[]>(this.url);
  }

  getBestellauftragById(id: number): Observable<BestellauftragDto> {
    const fullURL = this.url + '/' + id;
    return this.http.get<BestellauftragDto>(fullURL);
  }

  postBestellauftrag(data: object): Observable<object> {
    const fullURL = this.url;
    console.log('bestellauftragservice:Postbestellauftrag siehe drunter');
    console.log(data);
    return this.http.post<object>(fullURL, data);
  }

  putBestellauftrag(data: BestellauftragDto): Observable<BestellauftragDto> {
    const fullURL = this.url + '/' + data.bestellauftragId;
    console.log('putBestellauftrag');
    console.log(data);
    return this.http.put<BestellauftragDto>(fullURL, data);
  }
  deleteBestellauftrag(data: number): Observable<{}> {
    const fullURL = this.url + '/' + +data;
    return this.http.delete<BestellauftragDto>(fullURL);
  }

  // postAdvancedBestellauftrag(data: AdvancedBestellauftragDto): Observable<AdvancedBestellauftragDto> {
  //   const fullURL = this.url + '/advancedBestellauftragDto';
  //   return this.http.post<AdvancedBestellauftragDto>(fullURL, data);
  // }
}
