import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationDto } from 'src/app/DTOs/AuthenticationDto';
import { Globals } from 'src/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  url = this.globals.URL + '/Authentication';


  constructor(public http: HttpClient, public globals: Globals) { }

  public login(username: string, passwort: string): Observable<AuthenticationDto>{
    const url = `${this.url}/authenticate`;
    console.log('Authenticateeeeeee ---- ' + passwort);
    return this.http.post<AuthenticationDto>(url, {username: username, passwort: passwort})
  }
}
