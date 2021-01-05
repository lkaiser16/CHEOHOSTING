import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SimpleBestellungDto } from '../../dtos/SimpleBestellungDto';
import { Observable, BehaviorSubject } from 'rxjs';
import { Globals } from 'src/global-constants';
import { WarenkorbDto } from '../../dtos/WarenkorbDto';
import { BestellungDto } from 'src/app/dtos/BestellungDto';

@Injectable({
  providedIn: 'root',
})
export class BestellungService {
  test: SimpleBestellungDto[] = Array.from({ length: 100 }, (_, k) => createNewUser(k + 1));

  constructor(private http: HttpClient, public globals: Globals) {
    // this.test =
  }
  url = this.globals.URL + '/Bestellung/';

  private message = new BehaviorSubject(this.test);
  sharedMessage = this.message;

  getAllBestellungen(): Observable<SimpleBestellungDto[]> {
    // const searchURL = this.url + 'filterOffeneBestellungen' ;
    return this.http.get<SimpleBestellungDto[]>(this.url);
  }

  filterBestellungen(searchValue: string) {
    const searchURL = this.url + 'searchBestellungen/' + searchValue;
    return this.http.get<SimpleBestellungDto[]>(searchURL);
  }

  nextMessage(message: SimpleBestellungDto[]) {
    this.message.next(message);
  }

  getBestellungWithId(id): Observable<BestellungDto> {
    return this.http.get<BestellungDto>(this.url + id);
  }
  postBestellung(data: WarenkorbDto) {
    console.log('postBestellugn');
    const fullURL = this.url + 'PostWarenkorb';
    return this.http.post<WarenkorbDto>(fullURL, data);
  }

  putBestellung(data: WarenkorbDto, bestellungId: number) {
    console.log('putBestellung');
    const fullURL = this.url + 'putWarenkorb/' + bestellungId;
    return this.http.put<WarenkorbDto>(fullURL, data);
  }

  deleteBestellung(bestellungId: number) {
    console.log('deleteBestellung');
    const fullURL = this.url + 'deleteWarenkorb/' + bestellungId;
    return this.http.delete<WarenkorbDto>(fullURL);
  }

  getWarenkorbById(id: number): Observable<WarenkorbDto> {
    return this.http.get<WarenkorbDto>(this.url + 'GetWarenkorbById/' + id);
  }
}

function createNewUser(id: number): SimpleBestellungDto {
  return {
    bestellungsNummer: '',
    kostenstellenName: '',
    lieferantenName: '',
    letzterBearbeiter: '',
    status: '',
    bestellungId: null,
    bestelldatum: null,
    kostenstellenId: null,

  };

}
