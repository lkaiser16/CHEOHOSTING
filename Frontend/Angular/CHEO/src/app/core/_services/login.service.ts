import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDto } from '../../dtos/UserDto';
import { Globals } from 'src/global-constants';
import { PersonenDto } from '../../dtos/PersonenDto';
import { PersonService } from './person.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    public globals: Globals,
    public personService: PersonService,
    public router: Router
  ) { }

  public currentUser!: UserDto;
  public currentPerson!: PersonenDto;

  url = this.globals.URL + '/user/';

  getCurrentUser(): string | null {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  setCurrentPerson(person: PersonenDto) {
    return Promise.resolve().then(() => {
      localStorage.setItem('currentPerson', JSON.stringify(person));
    });
  }

  setCurrentUser(user: UserDto) {
    return Promise.resolve().then(() => {
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentPerson');
  }
}
