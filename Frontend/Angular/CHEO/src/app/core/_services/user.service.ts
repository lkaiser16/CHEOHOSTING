import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/global-constants';
import { UserDto } from '../../dtos/UserDto';
import { Observable } from 'rxjs';
import { UpdatePasswortDto } from 'src/app/dtos/UpdatePasswortDto';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, public globals: Globals) { }

  url = this.globals.URL + '/User';

  getAllUser() {
    return this.http.get<UserDto[]>(this.url);
  }

  getCurrentUser(): UserDto {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  getUserById2(userId: number) {
    const finalUrl = this.url + '/' + userId;
    return this.http.get<UserDto>(finalUrl).toPromise();
  }

  getUserById(userId: number): Observable<UserDto> {
    const finalUrl = this.url + '/' + userId;
    return this.http.get<UserDto>(finalUrl);
  }

  postUser(data: UserDto): Observable<UserDto> {
    return this.http.post<UserDto>(this.url, data);
  }

  putUser(data: UserDto): Observable<UserDto> {
    const fullURL = this.url + '/' + data.userId;
    return this.http.put<UserDto>(fullURL, data);
  }

  deleteUser(data: number): Observable<{}> {
    const fullURL = `${this.url}/${+data}`;
    return this.http.delete<UserDto>(fullURL);
  }

  updateUserPassword(id: number, data: UpdatePasswortDto): Observable<UserDto> {
    const fullURL = `${this.url}/UpdateUserPassword/${+id}`;
    console.log(data);
    return this.http.put<UserDto>(fullURL, data);
  }
}
