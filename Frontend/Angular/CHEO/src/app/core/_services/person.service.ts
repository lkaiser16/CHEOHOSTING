import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/global-constants';
import { PersonenDto } from '../../dtos/PersonenDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient, public globals: Globals, ) { }

  url = this.globals.URL + '/Person';

  getAllPersonen(): Observable<PersonenDto[]>
  {
    return this.http.get<PersonenDto[]>(this.url);
  }

  getCurrentPerson(): PersonenDto
  {
    return JSON.parse(localStorage.getItem('currentPerson'));
  }

  getPersonById(id: number): Observable<PersonenDto> {
    const fullURL = this.url + '/' + id;
    return this.http.get<PersonenDto>(fullURL);
  }

  postPerson(data: PersonenDto): Observable<PersonenDto> {
    return this.http.post<PersonenDto>(this.url, data);
  }

  putPerson(data: PersonenDto): Observable<PersonenDto> {
    const fullURL = this.url + '/' + data.personId;
    return this.http.put<PersonenDto>(fullURL, data);
  }

  deletePerson(data: number): Observable<{}> {
    const fullURL = `${this.url}/${+data}`;
    return this.http.delete<PersonenDto>(fullURL);
  }

  checkIfPersonIsUsed(data: number): Observable<boolean>{
    const fullURL = `${this.url}/CheckIfPersonIsUsed/${+data}`;
    return this.http.get<boolean>(fullURL);
  }

  getPersonsByUserId(rechtId: number): Observable<PersonenDto[]>
  {
    const fullURL = `${this.url}/GetPersonsWithRight/${+rechtId}`;
    return this.http.get<PersonenDto[]>(fullURL);
  }
}
