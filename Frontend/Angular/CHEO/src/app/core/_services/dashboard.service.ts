import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/global-constants';
import { UserDto } from '../../dtos/UserDto';
import { Observable } from 'rxjs';
import { SimpleBestellungDto } from '../../dtos/SimpleBestellungDto';
import { BestellauftragDto } from 'src/app/dtos/BestellauftragDto';

@Injectable({
  providedIn: 'root'
})
export class DashBoardService {
  currentUser: UserDto;

  constructor(private http: HttpClient, public globals: Globals) {

  }
  tableMessage = '';
  url: string = this.globals.URL + '/bestellauftrag';


  getOffeneBestellugngenList(): Observable<SimpleBestellungDto[]> {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // if (this.currentUser.rechte === 0) {
    //   const fullUrl = this.url + '/getDashboard/' + this.currentUser.personId;
    //   return this.http.get<BestellauftragDto[]>(fullUrl);
    // }
    // else if (this.currentUser.rechte >= 1) {
    const fullUrl = this.globals.URL + '/Bestellung/filterOffeneBestellungen/';
    return this.http.get<SimpleBestellungDto[]>(fullUrl);
    // }
  }
  getAufträgeByPersonId(personId: number): Observable<BestellauftragDto[]> {
    const fullUrl = this.url + '/getDashboard/' + personId;
    return this.http.get<BestellauftragDto[]>(fullUrl);
    // }
  }


  gettableMessage() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.rechte === 0) {
      this.tableMessage = 'DEINE BESTELLAUFTRÄGE';

    }
    else if (this.currentUser.rechte >= 1) {
      this.tableMessage = 'OFFENE BESTELLUNGEN';

    }
    return this.tableMessage;
  }

}
