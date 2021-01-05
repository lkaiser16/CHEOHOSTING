import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/global-constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { SimpleBestelldetailDto } from '../../dtos/SimpleBestelldetailDto';
import { SimpleArtikelDto } from '../../dtos/SimpleArtikelDto';
import { ArtikelDto } from 'src/app/dtos/ArtikelDto';

@Injectable({
  providedIn: 'root'
})
export class ArtikelService {

  constructor(private http: HttpClient, public globals: Globals) { }

  url = this.globals.URL + '/Artikel/';
  public test: SimpleBestelldetailDto = {
    artikeld: -1,
    bestellungId: -1,
    kostenstellenId: -1,
    menge: 1,
    rabatt: 'test',
    artikelBezeichnung: 'initial_artikel',
    preis: 5,
    lieferantId: -1,
    bestelldetailId: -1,
  };
  test2: SimpleBestelldetailDto[] = [{
    artikeld: -1,
    bestellungId: -1,
    kostenstellenId: -1,
    menge: 1,
    rabatt: 'test',
    artikelBezeichnung: 'initial_artikel',
    preis: 5,
    lieferantId: -1,
    bestelldetailId: -1,
  },
  ];

  private message = new BehaviorSubject<SimpleBestelldetailDto>(this.test);
  sharedMessage = this.message;

  private artikelAdded = new BehaviorSubject(this.test2);
  artikelAddedMessage = this.artikelAdded;

  private searchValueChanged = new BehaviorSubject('init_search');
  searchValueChangedMessage = this.searchValueChanged;
  getAllArtikel() {
    return this.http.get<SimpleArtikelDto[]>(this.url);
  }

  getArtikelById(artikelId) {
    return this.http.get<ArtikelDto>(this.url + artikelId);
  }

  postArtikel(data: ArtikelDto): Observable<ArtikelDto> {
    return this.http.post<ArtikelDto>(this.url, data);
  }

  putArtikel(data: ArtikelDto): Observable<ArtikelDto> {
    const fullURL = this.url + data.artikelId;
    console.log('putArtikel');
    console.log(data);
    return this.http.put<ArtikelDto>(fullURL, data);
  }

  deleteArtikel(data: number): Observable<{}> {
    const fullURL = `${this.url}${+data}`;
    return this.http.delete<ArtikelDto>(fullURL);
  }

  checkIfBestellungContainsArtikel(data: number): Observable<boolean> {
    const fullURL = `${this.url}CheckIfBestellungContainsArtikel/${+data}`;
    return this.http.get<boolean>(fullURL);
  }

  nextMessage(message: SimpleBestelldetailDto) {
    this.sharedMessage.next(message);
    // console.log('hansiii' + JSON.stringify(message));
    // this.sharedMessage = new BehaviorSubject(this.test);

  }
  notifyArtikelAddedMessage(message: SimpleBestelldetailDto[]) {
    this.artikelAddedMessage.next(message);

    // this.artikelAddedMessage = new BehaviorSubject(this.test2);


  }

  notifySearchValueChanged(message: string) {
    this.searchValueChanged.next(message);


  }



}
